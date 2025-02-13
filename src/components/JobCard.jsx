import PropTypes from "prop-types";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

function calcTime(postedTime) {
  const difference = Date.now() - new Date(postedTime);
  const timeFrames = [
    { limit: 1000, text: "Just now" },
    { limit: 60000, divisor: 1000, text: "seconds ago" },
    { limit: 3600000, divisor: 60000, text: "minutes ago" },
    { limit: 86400000, divisor: 3600000, text: "hours ago" },
    { limit: 604800000, divisor: 86400000, text: "days ago" },
  ];

  for (const { limit, divisor = 1, text } of timeFrames) {
    if (difference < limit) {
      return divisor === 1
        ? text
        : `${Math.floor(difference / divisor)} ${text}`;
    }
  }
  return new Date(postedTime).toLocaleDateString();
}

function JobCard({ job = [], saved = false, posted = false }) {
  const { jobSeekerId, employeeId } = useParams();
  const { users, setUsers } = useContext(UserDataContext);

  const activeUser = users?.find((user) =>
    jobSeekerId ? user.id === jobSeekerId : user.id === employeeId
  );

  function removeSavedJob(savedJobId) {
    if (confirm("Are you sure?")) {
      setUsers((allUsers) =>
        allUsers.map((user) =>
          user.id === activeUser.id
            ? {
                ...user,
                savedJobID: user.savedJobID?.filter((id) => id !== savedJobId),
              }
            : user
        )
      );
    }
  }

  function clearHistory() {
    setUsers((allUsers) =>
      allUsers.map((user) =>
        user.id === activeUser.id
          ? {
              ...user,
              ...(saved ? { savedJobID: [] } : {}),
              ...(posted ? { jobListings: [] } : {}),
              ...(!saved && !posted ? { appliedJobID: [] } : {}),
            }
          : user
      )
    );
  }

  function handleDeleteJob(jobId) {
    setUsers((allUsers) =>
      allUsers.map((user) =>
        user.id === employeeId
          ? {
              ...user,
              jobListings: user.jobListings.filter((job) => job.id !== jobId),
            }
          : user
      )
    );
  }

  const sortedPost = job.sort(
    (a, b) => new Date(b.postedTime) - new Date(a.postedTime)
  );

  return (
    <div>
      {sortedPost.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="absolute top-1 right-10 text-white gap-3">
            <span className="mr-2">Clear History</span>
            <i
              onClick={clearHistory}
              className="fa-solid fa-brush text-white cursor-pointer rotate-180"
            ></i>
          </div>

          {sortedPost.map((post, index) => (
            <div
              key={post.id || index}
              className="p-6 rounded-2xl bg-gray-900 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 border border-gray-700 mt-6"
            >
              {/* Job Title */}
              {(posted || saved) && (
                <div className="text-gray-500 text-right">
                  {saved && (
                    <i
                      onClick={() => removeSavedJob(post.id)}
                      className="fa-solid fa-bookmark text-2xl text-white cursor-pointer"
                    ></i>
                  )}
                  {posted && (
                    <i
                      onClick={() => handleDeleteJob(post.id)}
                      className="fa-solid fa-trash text-2xl text-white cursor-pointer hover:text-red-700 duration-300"
                    ></i>
                  )}
                </div>
              )}

              <p className="text-gray-500 text-sm">
                {calcTime(post.postedTime)}
              </p>

              <p className="text-2xl font-semibold text-white hover:text-green-400 hover:underline cursor-pointer transition-all duration-300">
                {post.title}
              </p>

              {/* Job Description */}
              <p className="text-gray-400 text-sm mt-2">{post.description}</p>

              {/* Pricing & Category */}
              <div className="flex justify-between items-center mt-3">
                <p className="text-indigo-400 font-medium">
                  📌 {post.category}
                </p>
                <p className="text-green-400 font-bold text-lg">
                  {post.salaryRange}
                </p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {post.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-300 border border-gray-600 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Job Details */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="bg-gray-200 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <i className="fas fa-check-circle text-green-500"></i>
                  Payment Verified
                </span>
                <span className="bg-cyan-700 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <i className="fa-solid fa-location-dot"></i>
                  {post.location}
                </span>
                <span className="bg-lime-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 uppercase">
                  <i className="fas fa-file-alt"></i>
                  {post.jobType}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/assets/noSearchFound.png"
            alt="No Jobs Found"
            className="max-w-[250px] opacity-80"
          />
          <p className="text-gray-400 mt-3 text-lg">No jobs found</p>
        </div>
      )}
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      category: PropTypes.string,
      salaryRange: PropTypes.string,
      skillsRequired: PropTypes.arrayOf(PropTypes.string),
      location: PropTypes.string,
      jobType: PropTypes.string,
    })
  ),
  saved: PropTypes.bool,
  posted: PropTypes.bool,
};

export default JobCard;
