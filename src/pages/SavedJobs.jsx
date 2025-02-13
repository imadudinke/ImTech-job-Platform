import { useContext } from "react";
import JobCard from "../components/JobCard";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

function SavedJobs() {
  const { jobSeekerId } = useParams();
  const { users, posts } = useContext(UserDataContext);

  const activeUser = users?.filter((user) => user.id == jobSeekerId)[0];
  const savedJobs = posts?.filter((post) =>
    activeUser?.savedJobID.includes(post.id)
  );

  return (
    <div className="p-5 bg-gray-800  relative sm:pb-5 pb-20 overflow-y-scroll">
      <JobCard saved={true} job={savedJobs} />
    </div>
  );
}

export default SavedJobs;
