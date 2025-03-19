import { Button, Divider } from "@mantine/core";
import PostJob from "../PostJob/PostJob";
import { IconAnchor, IconArrowLeft } from "@tabler/icons-react";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";

const SignUpPage=()=>{
  const location= useLocation();
  const navigate = useNavigate();
    return      <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden relative">
              <Button my="md" leftSection={<IconArrowLeft size={20}/>} className="!absolute z-10 left-5" color="brightSun.4" onClick={()=>navigate("/")} variant="light" >Home</Button>

          <div className={`w-[100vw] h-[100vh] transition-all flex ease-in-out duration-1000 [&>*]:flex-shrink-0 ${location.pathname=='/signup'?'-translate-x-1/2':'translate-x-0'}`}>
            <Login/>
    <div className={`w-1/2 h-full transition-all duration-1000 ease-in-out  ${location.pathname== "/signup" ? "rounded-r-[200px]":"rounded-l-[200px]"} bg-mine-shaft-900  flex items-center justify-center gap-5 flex-col`}>
    <div className="flex gap-1 items-center text-bright-sun-400">
        <IconAnchor className="h-16 w-16" strokeWidth={2.5} />
        <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-semibold">JobHook</div>
      </div>
      <div className="text-2xl bs-mx:text-xl md-mx:text-lg  text-mine-shaft-200 font-semibold">Find the Job made for you</div>
    </div>
    <SignUp/>

          </div>
        </div>
        

}
export default SignUpPage;