import { useState } from "react";
import { dropdownData } from "../Data/JobsData";
import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";
import Jobs from "./Jobs";
import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import MultiInput from "./MultiInput";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
    const matches = useMediaQuery(`(max-width:475px)`);
    const [opened, {toggle}]= useDisclosure(false);
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([1, 300]);
    const [name, setName] = useState('');

    const handleChange = (event: any) => {
        dispatch(updateFilter({ salary: event }));
    };

    return (
        <>
        <div>
            <div className="flex justify-end">
           {matches&&<Button m="sm" radius="lg" color="brightSun.4" variant="outline" autoContrast onClick={toggle}>{opened?"Filters":"Close"}</Button>}
            </div>
        <Collapse in={!(opened || !matches)}>
            <div className="px-5 lg-mx:!flex-wrap py-8 items-center flex !text-mine-shaft-100">
                {dropdownData.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full  lg-mx:w-1/4 w-1/5">
                            <MultiInput {...item} />
                        </div>
                        <Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" />
                    </React.Fragment>
                ))}
                
                <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%]  xs-mx:w-full  [&_.mantine-Slider-label]:!translate-y-10">
                    <div className="flex text-sm justify-between">
                        <div>Salary</div>
                        <div>&#8377;{value[0]} LPA - &#8377;{value[1]} LPA</div>
                    </div>

                    <RangeSlider
                        color="brightSun.4"
                        size="xs"
                        value={value}
                        onChange={setValue}
                        onChangeEnd={handleChange}
                    />
                </div>
            </div>
            </Collapse>
            </div>
        </>
    );
};

export default SearchBar;
