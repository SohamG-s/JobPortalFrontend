import {
  Anchor,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  Radio,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Services/UserService";
import { SignupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const SignUp = () => {
  const form = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT",
  };

  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
const navigate = useNavigate();
const [loading, setLoading]= useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | string) => {

    if (typeof event === "string") {
      setData((prevData) => ({ ...prevData, accountType: event }));
      return;
    }
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setFormError((prevErrors) => ({
      ...prevErrors,
      [name]: SignupValidation(name, value),
    }));
  };

  const handleSubmit = useCallback(() => {
    setLoading(true);
    let valid = true;
    let newFormError: { [key: string]: string } = {};

    for (let key in data) {
      if (key === "accountType") continue;
      if (key !== "confirmPassword") {
        newFormError[key] = SignupValidation(key, data[key]);
        if (newFormError[key]) valid = false;
      }
    }

    setFormError(newFormError);

    if (valid) {
      setLoading(true);

      registerUser(data)
        .then((res) => {
          console.log(res);
          setData(form);
          notifications.show({
            title: "Registered Successfully",
            message: "Redirecting to login page...",
            withCloseButton: true,
            icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
            color: "teal",
            withBorder: true,
            className: "!border-green-500",
          });
          setTimeout(()=>{
            setLoading(false);
navigate("/login");
          },4000)
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          notifications.show({
            title: "Registration Failed",
            message: err.response.data.errorMessage,
            withCloseButton: true,
            icon: <IconX style={{ width: "90%", height: "90%" }} />,
            color: "red",
            withBorder: true,
            className: "!border-red-500",
          });
        });
    }
  }, [data]);

  return <> <LoadingOverlay
            visible={loading}
            zIndex={1000}
            className="translate-x-1/2"
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'brightSun.4', type: 'bars' }}
          />
    <div className="w-1/2 px-20 flex flex-col bs-mx:px-10 md-mx:px-5 justify-center gap-3">
      <div className="text-2xl font-semibold">Create Account</div>
      <TextInput
        name="name"
        error={formError.name}
        value={data.name}
        onChange={handleChange}
        withAsterisk
        label="Full Name"
        placeholder="Your name"
      />
      <TextInput
        error={formError.email}
        name="email"
        onChange={handleChange}
        value={data.email}
        withAsterisk
        leftSection={<IconAt size={16} />}
        label="Email"
        placeholder="Your email"
      />
      <PasswordInput
        error={formError.password}
        name="password"
        onChange={handleChange}
        value={data.password}
        withAsterisk
        leftSection={<IconLock size={18} stroke={1.5} />}
        label="Password"
        placeholder="Password"
      />
      <PasswordInput
        error={formError.confirmPassword}
        name="confirmPassword"
        onChange={handleChange}
        value={data.confirmPassword}
        withAsterisk
        leftSection={<IconLock size={18} stroke={1.5} />}
        label="Confirm password"
        placeholder="Password"
      />
      <Radio.Group
        value={data.accountType}
        onChange={handleChange}
        label="You are ?"
        withAsterisk
      >
        <Group mt="xs">
          <Radio
            className="py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"
            autoContrast
            value="APPLICANT"
            label="Applicant"
          />
          <Radio
            className="py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"
            autoContrast
            value="EMPLOYER"
            label="Employer"
          />
        </Group>
      </Radio.Group>
      <Checkbox
        autoContrast
        defaultChecked
        label={
          <>
            I accept <Anchor> terms & conditions</Anchor>
          </>
        }
      />
      <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">
        Signup
      </Button>
      <div className="mx-auto">
        Have an account?{" "}
        <span  onClick={()=>{navigate("/login");setFormError(form); setData(form)}} className="text-bright-sun-400 hover:underline cursor-pointer">
          Login
        </span>
      </div>
    </div></>
  
};

export default SignUp;
