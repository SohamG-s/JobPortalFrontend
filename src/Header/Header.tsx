import { Avatar, Burger, Button, Drawer, Indicator } from "@mantine/core";
import { IconAnchor, IconBell, IconX, IconXboxX } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { useDisclosure } from "@mantine/hooks";

const links = [
  { name: "Find Job", url: "/find-jobs" },
  { name: "Find Talent", url: "/find-talent" }, // Fixed extra space
  { name: "Post Job", url: "/post-job/0" },
  { name: "Posted Jobs", url: "/posted-jobs/0" },
  {name : "Job History", url: "job-history"},
  {name : "SignUp", url: "signup"}

];


const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user && user.profileId) {
      getProfile(user.profileId)
        .then((res) => dispatch(setProfile(res)))
        .catch((err) => console.log(err));
    }
  }, [user]); 

  const location = useLocation();
  if (location.pathname === "/signup" || location.pathname === "/login") return null;

  return (
    <div className="w-full text-white bg-mine-shaft-950 px-6 h-20 flex justify-between items-center font-['poppins']">
      <div className="flex gap-1 items-center text-bright-sun-400">
        <IconAnchor  className="h-8 w-8" strokeWidth="2.5" />
        <div className="xs-mx:hidden text-3xl font-semibold">DockYourJob</div>
      </div>
      <NavLinks />
      <div className="flex gap-3 items-center">
        {user && user.profileId ? <ProfileMenu /> : (
          <Link to="/login">
            <Button variant="subtle" color="brightSun.4">Login</Button>
          </Link>
        )}
    
    {user?<NotiMenu/>:<></>}
    {

    }
    <Burger className="bs:hidden" opened={opened} onClick={open} aria-label="Toggle navigation" />
  
    <Drawer 
    size ="xs"
  overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} 
  position="right" 
  opened={opened} 
  onClose={close} 
  closeButtonProps={{ icon: <IconX size={30} stroke={2} /> }}
>

  <div className="flex flex-col gap-6 items-center">
  {links.map((link, index) => (
    <div
      key={index}
      className=" h-full flex items-center">
      <Link className="hover:text-bright-sun-400 text-xl" to={link.url}>{link.name}</Link>
    </div>
  ))}
  {/* Drawer content */}
  </div>
</Drawer>

      </div>
    </div>
  );
};

export default Header;
