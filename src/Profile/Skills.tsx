import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconX, IconPencil } from "@tabler/icons-react";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const Skills = () => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const [skills, setSkills] = useState(profile.skills || []);
  const [edit, setEdit] = useState(false);

  const handleClick = () => {
    setEdit(!edit);
    if (!edit) {
      setSkills(profile.skills || []);
    }
  };

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, skills };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile updated successfully");
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Skills
        <div>
          {edit && (
            <ActionIcon onClick={handleSave} size="lg" color="green.8" variant="subtle">
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon onClick={handleClick} size="lg" color={edit ? "red.8" : "brightSun.4"} variant="subtle">
            {edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
          </ActionIcon>
        </div>
      </div>

      {edit ? (
        <TagsInput value={skills} onChange={setSkills} placeholder="Add skill" splitChars={[",", " ", "|"]} />
      ) : (
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill: any, index: number) => (
            <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;
