import { ActionIcon, Avatar, Divider, FileInput, Overlay } from "@mantine/core";
import {
  IconPlus,
  IconDeviceFloppy,
  IconPencil,
  IconEdit,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";

import Info from "./Info";
import About from "./About";
import Skills from "./Skills";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { successNotification } from "../Services/NotificationService";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);

  const [edit, setEdit] = useState([false, false, false, false, false]);
  const [addExp, setAddExp] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const [about, setAbout] = useState("");



  useEffect(() => {
    if (profile?.about) {
      setAbout(profile.about);
    }
  }, [profile.about]); // Updates `about` when `profile.about` changes

  const { hovered, ref } = useHover();
  const handleFileChange=async(image:any)=>{
let picture:any= await getBase64(image);
let updatedProfile={...profile, picture:picture.split(',')[1]};
dispatch(changeProfile(updatedProfile));
successNotification('Success', 'Profile picture updated successfully');

  }
  const getBase64= (file:any)=>{
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();  
      reader.readAsDataURL(file);
      reader.onload=()=>resolve(reader.result);
      reader.onerror=error=>reject(error);
    })
  }
  const handleEdit = (index: number) => {
    setEdit((prev) => {
      const newEdit = [...prev];
      newEdit[index] = !newEdit[index];
      return newEdit;
    });
  };

  return (
    <div className="w-4/5 lg-mx:w-full mx-auto">
<div className="px-5">
        <div className="relative">
        <img className="rounded-t-2xl xs-mx:h-32" src="/Profile/banner.jpg" alt="Banner" />
        <div ref={ref} className="absolute flex items-center justify-center md-mx:-bottom-10 sm-mx:-bottom-16 -bottom-1/3 left-3">
        <Avatar 
  className="!w-48 !h-48 md-mx:!w-40 md-mx:!h-40 border-mine-shaft-950 sm-mx:!h-36 sm-mx:!w-36 border-8 rounded-full" 
  src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "/Avatar.png"} 
  alt="Profile Picture" 
/>
          {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75} />}
          {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
         {hovered &&<FileInput onChange={handleFileChange} className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full w-full" variant="transparent" accept="image/png,image/jpeg"/>}
        </div>
      </div>
      <Info />

      <Divider mx="xs" my="xl" />

      <About />

      <Divider mx="xs" my="xl" />

      {/* Single Skills Section */}
      <Skills />

      <Divider mx="xs" my="xl" />

      {/* Experience Section */}
      <Experience />

      <Divider mx="xs" my="xl" />

      {/* Certifications Section */}
      <Certificate />
    </div>
    </div>
  );
};

export default Profile;