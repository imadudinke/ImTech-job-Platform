import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";

function Applicants() {
  const { employeeId } = useParams();
  const { users } = useContext(UserDataContext);
  const activeUser = users.find((user) => user.id === employeeId);
  const postedJobs = activeUser?.jobListings || [];

  return (
    <section className="p-5 bg-gray-800  text-white overflow-y-scroll pb-30 sm:pb-5 ">
      <h2 className="text-3xl font-bold mb-5 text-center text-yellow-400">
        Job Applicants
      </h2>

      {postedJobs.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {postedJobs.map((job) => (
            <div
              key={job.id}
              className="border p-5 rounded-xl bg-gray-900 shadow-lg transition-transform hover:scale-[1.02]"
            >
              <h1 className="text-lg font-semibold pb-4 text-gray-300">
                Applicants for{" "}
                <span className="text-yellow-400">{job.jobTitle}</span>
              </h1>

              {users
                .filter((user) => job.applicantID?.includes(user.id))
                .map((applicant, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-4 bg-gray-800 shadow-md flex items-center gap-4 mb-4"
                  >
                    <img
                      src={applicant.profilePic}
                      alt={applicant.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">
                        {applicant.name}
                      </h3>
                      <p className="text-gray-400">{applicant.email}</p>
                      <p className="text-gray-400">{applicant.phone}</p>
                      <p className="text-sm font-semibold text-yellow-400">
                        {applicant.experience}
                      </p>
                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {applicant?.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-600 text-xs px-2 py-1 rounded-full text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      {/* Links */}
                      <div className="mt-3 flex gap-4">
                        <a
                          href={applicant.resume}
                          className="text-green-400 hover:text-green-300 text-sm font-medium"
                          download
                        >
                          <i className="fa-solid fa-file-arrow-down pr-1"></i>{" "}
                          Resume
                        </a>
                        {applicant.linkedIn && (
                          <a
                            href={applicant.linkedIn}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa-brands fa-linkedin pr-1"></i>{" "}
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      ) : (
        // No Applicants Found Section
        <div className="flex flex-col items-center justify-center w-full mt-10">
          <img
            src="/assets/noSearchFound.png"
            alt="No Applicants"
            className="max-w-[250px] opacity-80"
          />
          <p className="text-gray-400 mt-3 text-lg">No Applicants Found</p>
        </div>
      )}
    </section>
  );
}

export default Applicants;
