import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import JobCard from "../JobCard";

function PostedJobs() {
  const { employeeId } = useParams();
  const { users } = useContext(UserDataContext);
  const activeUser = users.filter((user) => user.id === employeeId)[0];
  const postedJob = activeUser?.jobListings;

  return (
    <div className="p-5 relative sm:pb-5 pb-20 bg-gray-800 overflow-y-scroll">
      <JobCard job={postedJob} posted={true} />
    </div>
  );
}

export default PostedJobs;
