import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { getJob, postJob } from "../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


const PostJob=()=>{
    const {id}= useParams();
    const [editorData, setEditorData]= useState(content);
    const user = useSelector ((state:any)=>state.user);
    const navigate = useNavigate();
    const select= fields;
     useEffect(()=>{
        window.scrollTo(0,0);
        if(id!=="0"){
            getJob(id).then((res)=>{
                form.setValues(res);
                setEditorData(res.description);
            }).catch((err)=>{
                console.log(err);
            })
        }
        else{
                form.reset();
    setEditorData(content);
        }
     },[id])
    const form = useForm({
        mode:'controlled',
        validateInputOnChange:true,
        initialValues:{
            jobTitle:'',
            company:'',
            experience:'',
            jobType:'',
            location:'',
            packageOffered:'',
            skillsRequired:[],
            about:'',
            description:content
        },
        validate:{
            jobTitle: isNotEmpty('Title is required'),
            company: isNotEmpty('Company is required'),
            experience: isNotEmpty('Experience is required'),
            jobType: isNotEmpty('Job type is required'),
            location: isNotEmpty('Location is required'),
            packageOffered: isNotEmpty('Package is required'),
            skillsRequired: isNotEmpty('Skills is required'),
            about: isNotEmpty('About is required'),
            description: isNotEmpty('Description is required'),

        }
    });

const handlePost=()=>{
form.validate();
if(!form.isValid())return;
postJob({...form.getValues(),id,postedBy:user.id,jobStatus:"ACTIVE"}).then((res)=>{
    successNotification("Success", "Job posted Successfully");
navigate(`/posted-jobs/${res.id}`);
}).catch((err)=>{
  
    errorNotification("Error", err.response.data.errorMessage);
})
}
const handleDraft=()=>{
   
    postJob({...form.getValues(),id,postedBy:user.id,jobStatus:"DRAFT"}).then((res)=>{
        successNotification("Success", "Job drafted Successfully");
        navigate(`/posted-jobs/${res.id}`);
    }).catch((err)=>{
        console.log(err);
        errorNotification("Error", err.response.data.errorMessage);
    })
    }

    return <div className="w-4/5 mx-auto ">
        <div className="text-2xl font-semibold  mb-5">Post  a Job</div>
        <div className="flex flex-col gap-5">
           <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput  form={form} name="jobTitle" {...select[0]}/>
            <SelectInput form={form} name="company" {...select[1]}/>

            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="experience" {...select[2]}/>
            <SelectInput form={form} name="jobType" {...select[3]}/>

            </div> 
            <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="location" {...select[4]}/>
            <NumberInput {...form.getInputProps('packageOffered')} label="Salary" clampBehavior="strict" min={1} max={300} withAsterisk placeholder="Enter Salary" hideControls />
            </div>  
            <TagsInput {...form.getInputProps('skillsRequired')} withAsterisk label="Skills"   splitChars={[',', ' ', '|']} placeholder="Enter SKill" clearable acceptValueOnBlur/>
            <Textarea
                            {...form.getInputProps('about')}
                            label="About Job"
                            autosize
                            minRows={3}
                            withAsterisk
                            placeholder="Enter about job..."
                        />
            <div>
                <div className="text-sm font-medium">Job Descrpition <span className="text-red-500">*</span></div>
                <TextEditor form={form} data = {editorData}/>
            </div>
            <div className="flex gap-4">
            <Button color="brightSun.4" onClick={handlePost} variant="light" >Publish Job</Button>
            <Button  color="brightSun.4" onClick={handleDraft} variant="outline" >Save as Draft</Button>
 
            </div>

        </div>
    </div>
}
export default PostJob;