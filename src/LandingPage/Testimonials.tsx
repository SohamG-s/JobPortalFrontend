import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../Data/Data";

const Testimonials=()=>{
  return <div className="mt-20 pb-5">
  <div className="text-4xl mb-3 text-center font-semibold text-mine-shaft-100">
    What <span className="text-bright-sun-400">User </span>Says about us?
  </div>
  <div className="flex justify-evenly md-mx:flex-wrap">
  {
    testimonials.map((data, index)=><div key={index} className="flex flex-col gap-3 w-[23%] md-mx:w-[48%] border-bright-sun-400 p-3 border rounded-xl mt-10">
    <div  className="flex gap-2 items-center">
   <Avatar className="!h-14 !w-14" src ="avatar.png" alt = "its me"/>
   <div>
     <div className="text-lg text-mine-shaft-100 font-semibold">{data.name}</div>
     <Rating value={data.rating} fractions={2} readOnly />
   
   </div>
    </div>
    <div className="text-xs text-mine-shaft-300">{data.testimonial}</div>
   
    </div>)
  }
  </div>
    </div>
}
export default Testimonials ;