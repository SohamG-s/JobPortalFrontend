import { Button, Modal, PasswordInput, PinInput, TextInput } from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons-react';
import React, { useState } from 'react';
import { changePass, sendOtp, verfiyOtp } from '../Services/UserService';
import { verify } from 'crypto';
import { errorNotification, successNotification } from '../Services/NotificationService';
import { useInterval } from '@mantine/hooks';

const ResetPassword = (props: any) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  // Boolean instead of string
  const [otpSending, setOtpSending]=useState(false);
  const [verified, setVerfied]= useState(false);
  const [password, setPassword]=useState("");
const [passErr, setPassErr]=useState("");
const [resendLoader, setResendLoader]=useState(false);
const [seconds, setSeconds] = useState(60);
const interval = useInterval(() => {
  if(seconds===0){
    setResendLoader(false);
    setSeconds(60);
    interval.stop();

}else
setSeconds((s) => s - 1)}, 1000);

  const handleSendOtp = () => {
    setOtpSending(true);
    sendOtp(email)
      .then((res) => {
        console.log(res);
        successNotification("OTP sent Successfull", "Please check your email for OTP"  )
        setOtpSent(true);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((err) => {
        console.log(err);
        setOtpSending(false);
        errorNotification("OTP  Failed" , err.response.data.errorMessage);
        
      });
  };
const handleVerifyOtp=(otp:string)=>{
    verfiyOtp(email,otp).then((res)=>{
        console.log(res);
        successNotification("OTP Verified ", "Enter new password to reset.");
        setVerfied(true);
    }).catch((err)=>{
        console.log(err);
        errorNotification("OTP Verification Failed", err.response.data.errorMessage);
    })
    // setOtpSent(false);
}
const resendOtp=()=>{
if(resendLoader)return;
handleSendOtp();
}
const changeEmail=()=>{
setOtpSent(false);
setResendLoader(false);
setSeconds(60);
setVerfied(false);
interval.stop();
}

const handleResetPassword=()=>{
changePass(email, password).then((res)=>{
  console.log(res);
  successNotification("Password Changed", "Login with new password.");
  props.close();
}).catch((err)=>{
  console.log(err);
  errorNotification("Password Reset Failed" , err. response.data.errorMessage);
})
}


  function signUpValidation(field: string, value: string): string {
    switch (field) {
      case 'password':
        if (value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        if (!/[A-Z]/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(value)) {
          return 'Password must contain at least one lowercase letter';
        }
        if (!/[0-9]/.test(value)) {
          return 'Password must contain at least one number';
        }
        if (!/[!@#$%^&*]/.test(value)) {
          return 'Password must contain at least one special character';
        }
        return '';
      default:
        return '';
    }
  }

  return (
    <Modal opened={props.opened} onClose={props.close} title="Reset Password">
      <div className="flex flex-col gap-6">
        <TextInput
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          withAsterisk
          size="md"
          leftSection={<IconAt size={16} />}
          label="Email"
          placeholder="Your email"
          rightSection={
            <Button
            loading={otpSending && !otpSent}
              disabled={email === ""|| otpSent}
              size="xs"
              className="mr-1"
              onClick={handleSendOtp}
              variant="filled"
            >
              OTP
            </Button>
          }
          rightSectionWidth={80} // Corrected
        />
       { otpSent && <PinInput  length={6} className="mx-auto" onComplete={handleVerifyOtp} gap="lg" size="md" type = "number"/>}
       {otpSent && !verified && 
       <div className='flex gap-2'>
          <Button
          fullWidth
            loading={otpSending}
             color="brightSun.4"
              onClick={resendOtp}
              variant="light"
            >
             {resendLoader?seconds: "Resend"}
            </Button>
            <Button
            fullWidth
            loading={otpSending}
             
              onClick={changeEmail}
              variant="filled"
            >
              Change Email
            </Button>
       </div>
       }
       {verified &&  <PasswordInput
        name="password"
        onChange={(e)=>{setPassword(e.target.value);setPassErr(signUpValidation("password",e.target.value))}}
        value={password}
        error={passErr}
        withAsterisk
        leftSection={<IconLock size={18} stroke={1.5} />}
        label="Password"
        placeholder="Password"
      /> }
      {
      verified && <Button onClick={handleResetPassword} variant="filled">Change Password</Button>}  
      
      </div>
    </Modal>
  );
};

export default ResetPassword;
