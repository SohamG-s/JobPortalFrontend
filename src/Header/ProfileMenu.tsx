import { Menu, Button, Text, Avatar, Switch } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconUserCircle,
  IconFileCv,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../Slices/UserSlice';
import { useSelector } from 'react-redux';
const ProfileMenu=()=> {
  const profile= useSelector((state:any)=>state.profile);
  const dispatch= useDispatch();
  const navigate = useNavigate();

  const user= useSelector((state:any)=>state.user);
    const[checked, setchecked] = useState(false);
    const[opened, setOpened] = useState(false);
    const handleLogout=()=>{
dispatch(removeUser());
navigate("/login");
    }
  
    return (
    <Menu shadow="md" width={200} opened= {opened} onChange={setOpened}>
      
      <Menu.Target>
  <button className="flex items-center gap-2 cursor-pointer focus:outline-none bg-transparent border-none">
    <div className="xs-mx:hidden">{user.name}</div>
    <Avatar src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "/Avatar.png"}  alt="it's me" />
  </button>
</Menu.Target>

      <Menu.Dropdown onChange={()=>setOpened(true)}>
        <Link to="/profile">
        <Menu.Item leftSection={<IconUserCircle size={14} />}>
          Profile
        </Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconFileCv size={14} />}>
          Resume
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
          
            <Switch
            checked={checked}
            onChange={(event) => setchecked(event.currentTarget.checked)}
      size="md"
      color="dark.4"
      onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
      offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
    />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />

       
        <Menu.Item onClick={handleLogout}
          color="red"
          leftSection={<IconLogout2 size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
export default ProfileMenu;