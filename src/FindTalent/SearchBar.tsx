import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core";
import { useState } from "react";
import { searchFields } from "../Data/TalentData";
import MultiInput from "../FindJobs/MultiInput";
import { IconUserCircle } from "@tabler/icons-react";
import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar=()=>{
  const dispatch = useDispatch();
  const matches = useMediaQuery(`(max-width:475px)`);
  const [opened,{toggle}]= useDisclosure(false); 
  const [value, setValue]= useState<[number, number]>([0,50]);
    const [name,setName]= useState('');
    const handleChange=(name:any, event:any)=>{
      if(name == "exp") dispatch(updateFilter({exp:event}));
      else{
        dispatch(updateFilter({name:event.target.value}));
        setName(event.target.value);
      }


    }
    return   <div>
                <div className="flex justify-end">
               {matches&&<Button m="sm" radius="lg" color="brightSun.4" variant="outline" autoContrast onClick={toggle}>{opened?"Filters":"Close"}</Button>}
                </div>
            <Collapse in={!(opened || !matches)}><div className=" lg-mx:!flex-wrap  px-5 py-8  items-center !text-mine-shaft-100 flex">
<div className="w-1/5  lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:mb-1 flex items-center">
<div className="text-bright-sun-400 bg-mine-shaft-900 p-1 rounded-full flex items-center justify-center">
<IconUserCircle size={25} /></div>
<Input defaultValue={name} onChange={(e)=>handleChange("name",e)} className="[&_input]:!placeholder-mine-shaft-100" variant="unstyled" placeholder="Talent Name" />
</div>
<Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" />


{
    searchFields.map((dropdownItem, idx) => {


      return   <React.Fragment key={idx}>
          <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 " >
            <MultiInput {...dropdownItem} />
          </div>
          <Divider  className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" />

        </React.Fragment>
})
}
      

<div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%]  xs-mx:w-full  [&_.mantine-Slider-label]:!translate-y-10 xs-mx:mb-1 ">
 <div className="flex text-sm justify-between">
    <div>Experience (Year)</div>
    <div> {value[0]}-{value[1]} </div>
 </div>
  <RangeSlider onChangeEnd={(e)=>handleChange("exp",e)}       minRange={1}
 min ={1}  max={50} color="brightSun.4" size="xs" value={value}   labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }}   onChange={setValue} />

  </div>
    </div>
    </Collapse>
    </div>
}
export default SearchBar;