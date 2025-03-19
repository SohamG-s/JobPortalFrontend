import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { name: "Find Job", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" }, // Fixed extra space
    { name: "Post Job", url: "/post-job/0" },
    { name: "Posted Jobs", url: "/posted-jobs/0" },
    {name : "Job History", url: "job-history"},
    {name : "SignUp", url: "signup"}

  ];

  const location = useLocation();

  return (
    <div className="flex bs-mx:!hidden gap-5 text-mine-shaft-300 h-full items-center">
      {links.map((link, index) => (
        <div
          key={index}
          className={`border-t-[3px] h-full flex items-center ${
            location.pathname === link.url ? "border-bright-sun-400 text-bright-sun-400" : "border-transparent"
          }`}
        >
          <Link to={link.url}>{link.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
