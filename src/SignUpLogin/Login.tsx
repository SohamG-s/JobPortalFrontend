import { Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";
import { loginUser } from "../Services/UserService";

const form = { email: "", password: "" };

const Login = () => {
  const[loading,setLoading]=useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormError({...formError,[event.target.name]:""})
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    let valid = true;
    let newFormError: { [key: string]: string } = {};

    for (let key in data) {
      const error = LoginValidation(key, data[key]);
      if (error) {
        newFormError[key] = error;
        valid = false;
      }
    }

    setFormError(newFormError);

    if (!valid) return;

    loginUser(data)
      .then((res) => {
        notifications.show({
          title: "Login Successfully",
          message: "Redirecting to home page...",
          withCloseButton: true,
          icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
          color: "teal",
          withBorder: true,
          className: "!border-green-500",
        });

        setTimeout(() => {
          setLoading(false);
          dispatch(setUser(res));
          navigate("/");
        }, 4000);

        navigate("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        notifications.show({
          title: "Login Failed",
          message: err.response.data.errorMessage,
          withCloseButton: true,
          icon: <IconX style={{ width: "90%", height: "90%" }} />,
          color: "red",
          withBorder: true,
          className: "!border-red-500",
        });
      });
  };

  return <>
  <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'brightSun.4', type: 'bars' }}
        />
    <div className="w-1/2 px-20 flex flex-col bs-mx:px-10 md-mx:px-5 justify-center gap-3">
      <div className="text-2xl font-semibold">Login to Your Account</div>

      <TextInput
        name="email"
        onChange={handleChange}
        value={data.email}
        error={formError.email}
        withAsterisk
        leftSection={<IconAt size={16} />}
        label="Email"
        placeholder="Your email"
      />

      <PasswordInput
        name="password"
        onChange={handleChange}
        value={data.password}
        error={formError.password}
        withAsterisk
        leftSection={<IconLock size={18} stroke={1.5} />}
        label="Password"
        placeholder="Password"
      />

      <Button loading={loading} onClick={handleSubmit} variant="filled">
        Login
      </Button>

      <div className="mx-auto">
        Don't have an account?{" "}
        <span onClick={()=>{navigate("/signup");setFormError(form); setData(form)}} className="text-bright-sun-400 hover:underline cursor-pointer">
          Signup
        </span>
      </div>
      <div onClick={open} className="text-bright-sun-400 text-center hover:underline cursor-pointer">
        Forget Password?
      </div>
    </div>
    <ResetPassword opened={opened} close={close}/>
  </>
};

export default Login;
