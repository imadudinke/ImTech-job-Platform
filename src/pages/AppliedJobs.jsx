import { useContext } from "react";
import JobCard from "../components/JobCard";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

function AppliedJobs() {
  const { jobSeekerId } = useParams();
  const { users, posts } = useContext(UserDataContext);

  const activeUser = users.filter((user) => user.id == jobSeekerId)[0];

  const appliedJob = posts.filter((post) =>
    activeUser.appliedJobID.includes(post.id)
  );
  return (
    <div className="p-5 relative sm:pb-5 pb-20 bg-gray-800 overflow-y-scroll">
      <JobCard job={appliedJob} />
    </div>
  );
}

export default AppliedJobs;
