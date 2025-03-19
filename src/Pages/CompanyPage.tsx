import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import RecommendTalent from "../TalentProfile/RecommendTalent";
import { profile } from "../Data/TalentData";
import Company from "../CompanyProfile/Company";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies";

const CompanyPage=()=>{
    const navigate = useNavigate();
    return <div>
  <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']  p-4">
        <Button my="md" leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" onClick={()=>navigate(-1)} variant="light" >Back</Button>
       
         
        <div className="flex gap-5 justify-between">
           <Company/>
           <SimilarCompanies/>
        </div>
        </div>

    </div>
}
export default CompanyPage;