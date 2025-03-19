import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconAdjustments, IconBookmark, IconBookmarkFilled, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card, desc, skills } from "../Data/JobDescData";
import DOMPurify from "dompurify";
import { timeAgo } from "../Services/Utilities";
import { profile } from "../Data/TalentData";
import { changeProfile } from "../Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { error } from "console";
import { postJob } from "../Services/JobService";

const JobDesc = (props: any) => {
  const data = DOMPurify.sanitize(props.description);
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile)
  const user = useSelector((state:any)=>state.user);
const [applied,setApplied]=useState(false);


  const handleSaveJob = () => {


    let savedJobs: any = [...profile.savedJobs];
    if (savedJobs?.includes(props.id)) {
        savedJobs = savedJobs?.filter((id: any) => id !== props.id)
    }
    else {
        savedJobs = [...savedJobs, props.id]
    }

    let updatedProfile = { ...profile, savedJobs: savedJobs }
    dispatch(changeProfile(updatedProfile))
}
useEffect(()=>{
if(props.applicants?.filter((applicant:any)=>applicant.applicantId==user.id).length>0){
setApplied(true)
}
else{
  setApplied(false)
}
},[props])



const handleClose=()=>{
 postJob({...props,jobStatus:"CLOSED"}).then((res)=>{
  successNotification("Success", "Job Closed Successfully");
 }).catch((err)=>{
  errorNotification("Error",err.response.data.errorMessage);
 })
  }

const cleanHTML= DOMPurify.sanitize(props.description);
  return (
    <div className="w-2/3 bs-mx:w-full">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center ">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img className="h-14" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold text-2xl">{props.jobTitle}</div>
            <div className="text-lg text-mine-shaft-300">
            {props.company} &bull; {timeAgo(props.postTime)} &#x2022;  {props.applicants?props.applicants.length: 0 }
          <span> Applicants</span>  </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
         {( props.edit || !applied) &&<Link to={props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`}>
            <Button color="brightSun.4" size="sm" variant="light">
              {props.closed?"Reopen":props.edit ? "Edit" : "Apply"}
            </Button>
          </Link>}
          {
       !props.edit && applied&&    <Button color="green.8" size="sm" variant="light">
             Applied
           </Button>
          }
          {props.edit &&! props.closed? 
            <Button onClick={handleClose} color="red.5" size="sm" variant="outline">
              Close
            </Button>
           :  
            profile.savedJobs?.includes(props.id) ? (
              <IconBookmarkFilled onClick={handleSaveJob} className="text-bright-sun-400 cursor-pointer" />
            ) : (
              <IconBookmark onClick={handleSaveJob} className="text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer" />
            )
          
          }
        </div>
      </div>

      <Divider mx="xs" my="xl" />

      <div className="flex justify-between">
        {card.map((item: any, index: number) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <ActionIcon
              color="brightSun.4"
              className="!h-12 !w-12"
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-mine-shaft-300 text-sm">{item.name}</div>
            <div className="font-semibold">{props?props[item.id]:"NA"}{item.id=="packageOffered"&&<> LPA</>}</div>
          </div>
        ))}
      </div>

      <Divider mx="xs" my="xl" />

      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2">
          {props?.skillsRequired?.map((skill:any, index:number) => (
            <ActionIcon
              color="brightSun.4"
              key={index}
              p="xs"
              className="!h-fit font-medium !text-sm !w-fit"
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              {skill}
            </ActionIcon>
          ))}
        </div>
      </div>

      <Divider mx="xs" my="xl" />

      <div
        className="[&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200"
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>

      <Divider mx="xs" my="xl" />

      <div>
        <div className="text-xl font-semibold mb-5">About the Company</div>
        <div>
          <div className="flex justify-between mb-3">
            <div className="flex gap-2 items-center ">
              <div className="p-3 bg-mine-shaft-800 rounded-xl">
                <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
              </div>
              <div className="flex flex-col ">
                <div className="font-medium text-lg">{props.company}</div>
                <div className="text-mine-shaft-300">10K+ Employees</div>
              </div>
            </div>
            <Link to={`/company/${props.company}`}>
              <Button color="brightSun.4" variant="light">
                Company Page
              </Button>
            </Link>
          </div>
          <div className="text-mine-shaft-300 text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
            similique cupiditate ex tempora aspernatur maiores voluptas ab totam
            molestiae nihil. Facilis sapiente animi autem asperiores dolor ea
            vero temporibus, est minima quos laborum delectus dignissimos itaque
            tenetur rerum, veniam voluptate!
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDesc;
function dispatch(arg0: { payload: any; type: "profile/changeProfile"; }) {
  throw new Error("Function not implemented.");
}

