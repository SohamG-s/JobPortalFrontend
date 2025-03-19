import { IconCheck, IconX, IconPencil } from '@tabler/icons-react';
import { useState } from 'react';
import { ActionIcon, Textarea } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { changeProfile } from '../Slices/ProfileSlice';
import { successNotification } from '../Services/NotificationService';

const About = () => {
    
  const profile = useSelector((state:any) => state.profile);
  const dispatch = useDispatch();

  // Initialize `about` with profile.about
  const [about, setAbout] = useState(profile.about || "");
  const [edit, setEdit] = useState(false);

  const handleClick = () => {
    setEdit(!edit);
    if (!edit) {
      setAbout(profile.about); // Set the about section when edit mode is enabled
    }
  };

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, about:about };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile updated Successfully");// Update Redux state
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About
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
        <Textarea
          value={about}
          autosize
          placeholder="Enter About yourself"
          minRows={3}
          onChange={(event) => setAbout(event.currentTarget.value)}
        />
      ) : (
        <div className=" text-mine-shaft-300 text-justify">
          {profile.about || "No information available"}
        </div>
      )}
    </div>
  );
};

export default About;
