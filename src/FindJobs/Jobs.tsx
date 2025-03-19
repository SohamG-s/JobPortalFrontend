import { useEffect, useState } from "react";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { useDispatch } from "react-redux";
import { resetSort } from "../Slices/SortSlice";

const Jobs = () => {
    const [jobList, setJobList] = useState([]); // ✅ Correct useState initialization
const filter = useSelector((state:any)=>state.filter);
const [filteredJobs,setFilteredJobs]=useState<any>([]);
const dispatch = useDispatch();
const sort = useSelector((state:any)=>state.sort);


    useEffect(() => {
            dispatch( resetFilter());
        dispatch(resetSort());
        getAllJobs()
            .then((res) => {
                setJobList(res.filter((job: any) => job.jobStatus === "ACTIVE"));
         console.log(res[0]);
            })
            .catch((err) => console.log(err)); // ✅ Moved `.catch()` outside `.then()`
    }, []); 

useEffect(()=>{
    if(sort=="Most Recent"){
setJobList([...jobList].sort((a:any,b:any)=>new Date(b.postTime).getTime()-new Date (a.postTime).getTime()));
}
else if(sort =="Salary: Low to High"){
    setJobList([...jobList].sort((a:any, b:any)=>a.packageOffered-b.packageOffered));
}
else if(sort=="Salary: High to Low"){
    setJobList([...jobList].sort((a:any, b:any)=>b.packageOffered-a.packageOffered));
}


},[sort])


    useEffect(()=>{
        let filtered = jobList;
     
            if (filter["Job Title"] && filter["Job Title"].length > 0) {    
                filtered = filtered.filter((job: any) => filter["Job Title"]?.some((x: any) => job.jobTitle.toLowerCase().includes(x.toLowerCase()))) 
            }
            if (filter.Location && filter.Location.length >0){
                filtered = filtered.filter((job: any) => filter.Location?.some((x: any) => job.location.toLowerCase().includes(x.toLowerCase())))       
            }
            if(filter.Experience && filter.Experience.length > 0 ){
                filtered = filtered.filter((job:any)=>filter.Experience?.some((x:any)=>job.experience?.toLowerCase().includes(x.toLowerCase())));        
            }
            if (filter["Job Type"] && filter["Job Type"].length > 0) {    
                filtered = filtered.filter((job: any) => filter["Job Type"]?.some((x: any) => job.jobType.toLowerCase().includes(x.toLowerCase()))) 
            }
            if(filter.salary && filter.salary.length > 0){
                filtered = filtered.filter((jobs:any)=> filter.salary[0] <= jobs.packageOffered && jobs.packageOffered <= filter.salary[1]);
            }           
        setFilteredJobs(filtered); 
    },[filter,jobList]
    )


    return (
        <div className="p-5">
            <div className="flex justify-between flex-wrap mt-5" >
                <div className="text-2xl xs-mx:text-xl font-semibold">Recommended Jobs</div>
                <Sort sort="job" />
            </div>
            <div className="mt-10 flex flex-wrap gap-10">
                {filteredJobs.map((job:any, index:any) => (
                    <JobCard key={index} {...(typeof job === 'object' ? job : {})} />
                ))}
            </div>
        </div>
    );
};

export default Jobs;


