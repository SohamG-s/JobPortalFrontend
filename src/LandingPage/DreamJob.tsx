import { Avatar, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import React from 'react'

const DreamJob = () => {
  return (
   <div className='flex items-center px-16 sm-mx:flex-col-reverse bs-mx:px-10  md-mx:px-5'>
        <div className='flex flex-col w-[45%] sm-mx:w-full gap-3'>
<div className='text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400 '>
Find your <span>dream </span><span>job</span> with us
</div>
<div className='text-lg text-mine-shaft-200'>
Good life begins with a good company.Start explore thousands of jobs in one place.
</div>
<div className='flex gap-3 mt-5'>

   <TextInput
    className='bg-mine-shaft-900 [&_input]:!text-mine-shaft-100  rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100'
    
    variant="unstyled"
    size="md"
    radius="md"
    description="Job Title"
    placeholder="Software Engineer"
  />
    
    <TextInput
    className='bg-mine-shaft-900 [&_input]:!text-mine-shaft-100  rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100'

        
        variant="unstyled"
        size="md"
        radius="md"
        description="Job Type"
        placeholder="Fulltime"
      />
    
  <div className='flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover: bg-bright-sun-500 cursor-pointer'>
    <IconSearch  className='h-[85%] w-[85%]'/>
  </div>

</div>
        </div>
        
        <div className='w-[55%] sm-mx:w-full flex items-center justify-center'>
            <div className='w-[30rem] relative'>
            <img src="/Boy.png" alt="boy" />
    <div className='absolute -right-10 w-fit border-bright-sun-400 xs-mx:right-[0%] xs-mx:top-[30%] top-[50%]  border rounded-lg p-2 backdrop-blur-md '>
     
      <div className='text-center mb-1 text-sm  text-mine-shaft-100'>
         10k+ got job
      </div>
    <Avatar.Group>
      <Avatar src="avatar-7.png" />
      <Avatar src="avatar-8.png" />
      <Avatar src="avatar-9.png" />
      <Avatar>+9k</Avatar>
    </Avatar.Group>
    </div>
    <div className='absolute -left-5 w-fit border-bright-sun-400 xs-mx:top-[60%]  bs-mx:top-[35%]  top-[28%]  border rounded-lg p-2 backdrop-blur-md gap-3 flex flex-col '>
    
      <div className='flex gap-2 items-center '>
<div className='w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg'>
<img src="/Google.png" alt="" />
</div>
<div className='text-sm  text-mine-shaft-100'>
  <div>Software Engineer</div>
  <div className='text-mine-shaft-200  text-xs'>New York</div>
</div>
      </div>
      <div className='flex gap-2 justify-around text-mine-shaft-200 text-xs'>
        <span>1 day ago</span>
      <span>120 Applicants</span>
      </div>
    </div>
            </div>
            </div> 
   </div>

   
  )
}

export default DreamJob
