import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, TimeInput } from "@mantine/dates";
import { useEffect, useState, useRef } from "react";
import { getProfile } from "../Services/ProfileService";
import { changeAppStatus } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { Avatar, Divider, Button, Modal, Text } from "@mantine/core";
import { IconHeart, IconCalendarWeek, IconMapPin, IconCalendarMonth } from "@tabler/icons-react";
import { formatInterviewTime, openBase64PDF } from "../Services/Utilities";

const TalentCard = (props: any) => {
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [app,{open:openApp,close:closeApp}]=useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>("");
  const [profile, setProfile] = useState<any>({});
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.applicantId) {
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => console.log(err));
    } else {
      setProfile(props);
     
    }
  }, [props]);

  const handleOffer = (status: string) => {
    let interview: any = { id, applicantId: profile?.id, applicationStatus: status }
    if (status == "INTERVIEWING") {
        const [hours, minutes] = time.split(":").map(Number);
        date?.setHours(hours, minutes)
        interview = { ...interview, interviewTime: date }

    }
  
  
    changeAppStatus(interview)
      .then((res) => {
        if (status === "INTERVIEWING")
          successNotification("Interview Scheduled", "Interview Scheduled Successfully");
        else if (status === "OFFERED")
          successNotification("Offered", "Offer has been sent successfully");
        else
          successNotification("Rejected", "Applicant has been Rejected");
  
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", err.response?.data?.errorMessage || "Something went wrong.");
      });
  };
  

  return (
    <div className="bg-mine-shaft-900 p-4 w-96 bs-mx:w-[48%] md-mx:w-full flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow]">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar
              size="lg"
              src={profile?.picture ? `data:image/jpeg;base64,${profile?.picture}` : "/Avatar.png"}
              alt=""
            />
          </div>
          <div>
            <div className="font-semibold  text-lg">{profile?.name}</div>
            <div className="text-sm text-mine-shaft-300">
              {profile?.company} &#x2022; {profile?.jobTitle}
            </div>
          </div>
        </div>
        <IconHeart className="text-mine-shaft-300 cursor-pointer" />
      </div>

      <div className="flex gap-2 text-xs">
        {profile?.skills?.slice(0, 4).map((skill: any, index: number) => (
          <div key={index} className="py-1 px-2 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
            {skill}
          </div>
        ))}
      </div>

      <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
        {profile?.about}
      </Text>

      <Divider size="xs" color="mineShaft.7" />

      {
                        props.invited ? <div className="flex gap-1 text-sm items-center">
                            <IconCalendarMonth /> Interview: {formatInterviewTime(props.interviewTime)}
                        </div>
                         :  <div className="flex justify-between">
                          <div className=" text-mine-shaft-300">Exp: {props.totalExp?props.totalExp:1} Years</div>
                          <div className="text-xs flex gap-1 items-center text-mine-shaft-400">
                            <div className="flex text-gray-400 items-center"><IconMapPin className="h-10" />  {profile?.location}</div>
                  </div>
                  </div>
                  }

      <Divider size="xs" color="mineShaft.7" />

      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited ? (
          <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button color="brightSun.4" variant="outline" fullWidth>
                Profile
              </Button>
            </Link>
            <div>
              {props.posted ? (
                <Button onClick={open} rightSection={<IconCalendarWeek className="w-5 h-5" />} color="brightSun.4" variant="light" fullWidth>
                  Schedule
                </Button>
              ) : (
                <Button color="brightSun.4" variant="light" fullWidth>
                  Message
                </Button>
              )}
            </div>
          </>
        ) : (
          
          <>

            <Button color="brightSun.4" onClick={()=>handleOffer("OFFERED")} variant="outline" fullWidth>
              Accept
            </Button>
            
            <Button color="brightSun.4" onClick={()=>handleOffer("REJECTED")} variant="light" fullWidth style={{marginLeft:"8px"}}>
              Reject
            </Button>
            
          </>
          
        )}
      </div>

{
  (props.invited|| props.posted)&&<Button color="brightSun.4" onClick={openApp} variant="filled" fullWidth>
  View Application
</Button>
}
      <Modal opened={opened} onClose={close} title="Schedule Interview">
        <div className="flex flex-col gap-4">
          <DateInput minDate={new Date()} value={date} onChange={setDate} label="Date" placeholder="Enter Date" />
          <TimeInput label="Time" value={time} onChange={(e) => setTime(e.currentTarget.value)} ref={ref} />
          <Button onClick={() => handleOffer("INTERVIEWING")} color="brightSun.4" variant="outline" fullWidth>
            Schedule
          </Button>
        </div>
      </Modal>
      <Modal opened={app} onClose={closeApp} title="Application">
        <div className="flex flex-col gap-4">
         <div>
          Email: &emsp; <a className="text-bright-sun-400 text-center hover:underline cursor-pointer" href={`mailto:${props.email}`}>{props.email}</a>
         </div>
         <div>
          Website: &emsp; <a target="_blank" className="text-bright-sun-400 text-center hover:underline cursor-pointer" href={props.website}>{props.website}</a>
         </div>
         <div>
          Resume: &emsp; <span className="text-bright-sun-400 text-center hover:underline cursor-pointer" onClick={()=>openBase64PDF(props.resume)}>{props.name}</span>
         </div>
         <div>
        Cover Letter: &emsp; <div> {props.coverLetter} </div>
         </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
