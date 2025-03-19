import { Button } from "@mantine/core";
import Company from "../CompanyProfile/Company";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies";
import PostJob from "../PostJob/PostJob";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";

const PostedJobPage=()=>{
    const navigate = useNavigate();
    const {id}=useParams();
    const user = useSelector((state:any)=>state.user);
    const [jobList, setJobList]= useState<any[]>([]);
    const [job,setJob]=useState<any>({});
    useEffect(()=>{
window.scrollTo(0,0);
getJobPostedBy(user.id).then((res)=>{
    setJobList(res);
    if(res && res.length>0 && Number(id)==0)navigate(`/posted-jobs/${res[0].id}`);
    setJob(res.find((item:any)=>item.id==id));
}).catch((err)=>{
    console.log(err);
})
    },[id])
    return <div>
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']  p-4">
         
           
          <div className="flex gap-5 ">
             <PostedJob job={job} jobList={jobList}/>
             <PostedJobDesc {...job}/>
          </div>
          </div>
  
      </div>
}
export default PostedJobPage;