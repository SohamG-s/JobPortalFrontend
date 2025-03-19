const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short' } as const;
    return date.toLocaleString('en-US', options);
  };
  
  function timeAgo(time:string) {
    const now = new Date();
    const postDate = new Date(time);
    const diff = now.getTime() - postDate.getTime(); // Difference in milliseconds

    if (isNaN(postDate.getTime())) return "Invalid date"; // Handle invalid date input

    const seconds = Math.floor(diff / 1000);
    if (seconds < 5) return "Just now";
    if (seconds < 60) return `${seconds} seconds ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} days ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} weeks ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;

    const years = Math.floor(days / 365);
    return `${years} years ago`;


  }
  const getBase64= (file:any)=>{
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();  
      reader.readAsDataURL(file);
      reader.onload=()=>resolve(reader.result);
      reader.onerror=error=>reject(error);
    });
  };
const formatInterviewTime= (dateStr:any)=>{
  const date = new Date (dateStr);

  return  date.toLocaleString ('en-US',{
    year : 'numeric',
    month : 'long',
    day : 'numeric',
    hour : 'numeric',
    minute : 'numeric',
    hour12 : true
  });
}

const openBase64PDF = (base64String:string) =>{
  const byteCharecters = atob(base64String)
  const byteNumbers = new Array(byteCharecters.length)

  for (let i=0; i< byteCharecters.length; i++){
      byteNumbers[i] = byteCharecters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], {type:'application/pdf'})
  const blobUrl = URL.createObjectURL(blob)
  window.open(blobUrl, '_blank')
}

  export { formatDate,timeAgo,getBase64 , formatInterviewTime,openBase64PDF};
  