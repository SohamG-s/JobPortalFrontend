import { useState } from "react";
import fields from "../Data/Profile";
import { ActionIcon, NumberInput } from "@mantine/core";
import { IconDeviceFloppy, IconPencil, IconBriefcase, IconMapPin, IconCheck, IconX } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const Info = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const select = fields;
  const [edit, setEdit] = useState(false);

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange:true,
    initialValues: { jobTitle: '', company: '', location: '',totalExp:1 }
  });

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({ jobTitle: profile.jobTitle, company: profile.company, location: profile.location,'totalExp':profile.totalExp });
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, ...form.getValues() };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile updated Successfully");
  };

  return (
    <div className="px-3 mt-24">
      <div className="text-3xl font-semibold flex justify-between">
        {user.name}
        <div>
          {edit && (
            <ActionIcon onClick={handleSave} size="lg" color="green.8" variant="subtle">
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon onClick={handleClick} size="lg" color={edit?"red.8":"brightSun.4"} variant="subtle">
            {edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
          </ActionIcon>
        </div>
      </div>

      {edit ? (
        <>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>

          <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput  form={form} name="location" {...select[2]} />
           <NumberInput withAsterisk clampBehavior="strict" min={1} max={50} label="Experience" hideControls {...form.getInputProps('totalExp')}/>
          </div>
        </>
      ) : (
        <>
          <div className="text-xl flex gap-1 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5} /> {profile.jobTitle} &bull; {profile.company}
          </div>
          <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            {profile.location}
          </div>
          <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />
           Experience:  {profile.totalExp} Years
          </div>
        </>
      )}
    </div>
  );
};

export default Info;
