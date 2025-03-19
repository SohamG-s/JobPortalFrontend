import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const ExpCard = (props: any) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);

    const handleDelete = () => {
        let exp = Array.isArray(profile.experience) ? [...profile.experience] : [];
        exp.splice(props.idx, 1);
        let updatedProfile = { ...profile, experience: exp };
        dispatch(changeProfile(updatedProfile));
        successNotification('Success', 'Experience deleted successfully');
    };

    return (
        <>
            {!edit ? (
                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex  p-2 justify-between">
                        <div className="flex gap-2 items-center capitalize">
                            <div className="p-2 bg-mine-shaft-800 rounded-md">
                                <img className="h-7" src={`/Icons/${props.company}.png`} alt={props.company} />
                            </div>
                            <div>
                                <div className="text-lg font-semibold">{props.title}</div>
                                <div className="">{props.company} &middot; {props.location}</div>
                            </div>
                        </div>
                        <div className="">
                            {formatDate(props.startDate)} - {props.working ? 'Present' : formatDate(props.endDate)}
                        </div>
                    </div>
                    <div className="text-justify text-mine-shaft-300" >
                        {props.description}
                    </div>
                    {props.edit && (
                        <div className="flex gap-5">
                            <Button onClick={() => setEdit(true)} color="brightSun.4" variant="light">Edit</Button>
                            <Button onClick={handleDelete} color="red.8" variant="light">Delete</Button>
                        </div>
                    )}
                </div>
            ) : (
                <ExpInput {...props} setEdit={setEdit} />
            )}
        </>
    );
};

export default ExpCard;