import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

function Modal({ setShowModal, post }) {
  const [saveSuccess, setSavedSuccessFull] = useState(false);
  const [applySuccess, setAppliedSuccessFull] = useState(false);
  const { jobSeekerId } = useParams();
  const { setUsers } = useContext(UserDataContext);

  function handelSave(newJobID) {
    setUsers((allUsers) =>
      allUsers.map((user) =>
        user.id === jobSeekerId
          ? {
              ...user,
              savedJobID: [...user.savedJobID, newJobID],
            }
          : user
      )
    );
    setSavedSuccessFull(true);
  }

  function handleApply(newAppliedJobID) {
    setUsers((allUsers) =>
      allUsers.map((user) => {
        if (user.id === jobSeekerId) {
          return {
            ...user,
            appliedJobID: [...user.appliedJobID, newAppliedJobID],
          };
        }

        if (user?.role.toLowerCase() === "employer") {
          return {
            ...user,
            jobListings: user.jobListings.map((job) =>
              job.id === newAppliedJobID
                ? { ...job, applicantID: [...job.applicantID, jobSeekerId] }
                : job
            ),
          };
        }

        return user;
      })
    );

    setAppliedSuccessFull(true);
  }

  return (
    <div className="z-40 fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6">
      {!saveSuccess && !applySuccess && (
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 relative max-w-2xl w-full border border-gray-600">
          <button
            className="absolute top-0 right-6 text-2xl text-gray-300 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-700"
            onClick={() => setShowModal(false)}
          >
            <i className="fas fa-times px-2"></i>
          </button>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 bg-clip-text text-transparent">
            {post.jobTitle}{" "}
          </h1>
          <div className="space-y-6">
            <div className="prose max-w-none text-gray-300">
              <p className="text-lg text-wrap">{post.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-4"></div>
            </div>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => handelSave(post.id)}
                className="px-6 py-2.5 rounded-xl text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <i className="fas fa-bookmark"></i>
                Save Job
              </button>
              <button
                onClick={() => handleApply(post.id)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white hover:scale-[1.02] transition-transform shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <i className="fas fa-paper-plane"></i>
                Easy Apply
              </button>
            </div>
          </div>
        </div>
      )}
      {saveSuccess && (
        <div className="bg-white rounded-2xl shadow-2xl p-8 relative max-w-2xl w-full border border-gray-600">
          <p className="text-xl font-mono font-bold bg-gradient-to-r from-gray-900 via-yellow-900 to-red-600 bg-clip-text text-transparent">
            Successfully saved
          </p>
          <button
            className="absolute top-[20%] right-6 text-2xl text-gray-300 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-700"
            onClick={() => setShowModal(false)}
          >
            <i className="fas fa-times px-2"></i>
          </button>
        </div>
      )}
      {applySuccess && (
        <div className="bg-white rounded-2xl shadow-2xl p-8 relative max-w-2xl w-full border border-gray-600">
          <p className="text-xl font-mono font-bold bg-gradient-to-r from-gray-900 via-yellow-900 to-red-600 bg-clip-text text-transparent">
            Applied Successfully ;)
          </p>
          <button
            className="absolute top-[20%] right-6 text-2xl text-gray-300 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-700"
            onClick={() => setShowModal(false)}
          >
            <i className="fas fa-times px-2"></i>
          </button>
        </div>
      )}
    </div>
  );
}
Modal.propTypes = {
  setShowModal: PropTypes.func,
  post: PropTypes.object,
};
export default Modal;
