import { useEffect, useState } from "react";
import { talents } from "../Data/TalentData";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mantine/core";
import { resetFilter } from "../Slices/FilterSlice";


const Talents=()=>{
    const dispatch = useDispatch();
    const [ talents, setTalents] = useState<any>([]);

const filter = useSelector((state:any)=>state.filter);
const sort =  useSelector((state:any)=>state.sort);
const [filteredTalents, setFilteredTalents]=useState<any>([]);

    useEffect(()=>{
    dispatch( resetFilter())
        getAllProfiles().then((res)=>{
            setTalents(res);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
     
if(sort =="Experience: Low to High"){
        setTalents([...talents].sort((a:any, b:any)=>a.totalExp-b.totalExp));
    }
    else if(sort=="Experience: High to Low"){
        setTalents([...talents].sort((a:any, b:any)=>b.totalExp-a.totalExp));
    }
    
    
    },[sort])

    useEffect(()=>{
        let filterTalent = talents;
        
        if (filter.name) {
            filterTalent = filterTalent.filter((talent: any) =>
              (talent.name ? talent.name.toLowerCase() : "").includes(
                filter.name ? filter.name.toLowerCase() : ""
              )
            );
          }
                
          if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filterTalent = filterTalent.filter((talent: any) =>
              filter["Job Title"]?.some((title: any) =>
                (talent.jobTitle ? talent.jobTitle.toLowerCase() : "").includes(
                  title ? title.toLowerCase() : ""
                )
              )
            );
          }

          if (filter.Location && filter.Location.length > 0) {
            filterTalent = filterTalent.filter((talent: any) =>
              filter.Location?.some((location: any) =>
                (talent.location ? talent.location.toLowerCase() : "").includes(
                  location ? location.toLowerCase() : ""
                )
              )
            );
          }

          if (filter.Skills && filter.Skills.length > 0) {
            filterTalent = filterTalent.filter((talent: any) =>
              filter.Skills?.some((skill: any) =>
                talent.skills?.some((talentSkill: any) =>
                  (talentSkill ? talentSkill.toLowerCase() : "").includes(
                    skill ? skill.toLowerCase() : ""
                  )
                )
              )
            );
          }
if(filter.exp && filter.exp.length>0){
    filterTalent = filterTalent.filter((talent:any)=>filter.exp[0]<=talent.totalExp && talent.totalExp<=filter.exp[1]);
}


        setFilteredTalents(filterTalent); 
    },[filter,talents]
    )

    return <div className="p-5">
    <div className="flex justify-between">
        <div className="text-2xl font-semibold">Talents</div>
        <Sort/>
    </div>
    <div className="mt-10 flex flex-wrap gap-10 justify-between">
   {
    filteredTalents.length?filteredTalents.map((talent:any, index:any)=> <TalentCard key={index}{...talent}/>): <div className="text-3xl font-semibold">No talents found</div>

    }
    </div>
    </div>
}
    export default Talents;
    