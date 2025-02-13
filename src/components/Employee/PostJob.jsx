import { useContext, useState } from "react";
import { UserDataContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function PostJob() {
  const { employeeId } = useParams();
  const { setUsers } = useContext(UserDataContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState("");
  const [deadline, setDeadline] = useState("");

  function resetForm() {
    setTitle("");
    setDescription("");
    setSkill("");
    setLocation("");
    setExperience("");
    setJobType("");
    setCategory("");
    setSalary("");
    setDeadline("");
  }

  function handlePost(e) {
    e.preventDefault();
    const newId = uuidv4();
    const newJobPost = {
      jobTitle: title,
      category,
      applicantID: [],
      skillsRequired: skill.split(",").map((s) => s.trim()),
      location,
      jobType,
      description,
      salaryRange: salary,
      deadline: new Date(deadline).toLocaleDateString(),
      postedTime: new Date().toISOString(),
      id: newId,
    };

    setUsers((users) =>
      users.map((user) =>
        user.id === employeeId
          ? { ...user, jobListings: [...user.jobListings, newJobPost] }
          : user
      )
    );

    resetForm();
    alert("Job Successfully Posted!");
  }

  return (
    <section className="bg-gray-800 flex justify-center py-6 overflow-y-scroll  pb-20 sm:pb-6">
      <div className="flex flex-col p-6 text-white w-[90%] sm:w-[70%] max-w-3xl border shadow-lg rounded-lg bg-gray-900 h-[1000px] sm:h-[800px]">
        <h1 className="text-2xl text-yellow-400 font-bold text-center">
          Post a Job
        </h1>

        <form onSubmit={handlePost} className="space-y-4 w-full">
          {/* Job Title */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Job Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter job title"
              className="border border-gray-600 p-3 rounded-lg bg-gray-800 text-white"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job description..."
              className="border border-gray-600 p-3 rounded-lg bg-gray-800 text-white min-h-[150px]"
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold">
              Skills (comma-separated)
            </label>
            <input
              required
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              type="text"
              placeholder="e.g. JavaScript, React, Node.js"
              className="border border-gray-600 p-3 rounded-lg bg-gray-800 text-white"
            />
          </div>

          {/* Salary & Deadline */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-lg font-semibold">Salary</label>
              <input
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                type="text"
                placeholder="Enter salary amount"
                className="border border-gray-600 p-3 rounded-lg bg-gray-800 text-white w-full"
              />
            </div>

            <div className="flex-1">
              <label className="text-lg font-semibold">Deadline</label>
              <input
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                type="date"
                className="border border-gray-600 p-3 rounded-lg bg-gray-800 text-white w-full"
              />
            </div>
          </div>

          {/* Dropdowns: Location, Experience, Job Type, Category */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Location */}
            <div className="relative">
              <label className="text-lg font-semibold">Location</label>
              <select
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
              >
                <option value="">Select location</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>

            {/* Experience Level */}
            <div className="relative">
              <label className="text-lg font-semibold">Experience</label>
              <select
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
              >
                <option value="">Select experience</option>
                <option value="entry">Entry Level</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
              </select>
            </div>

            {/* Job Type */}
            <div className="relative">
              <label className="text-lg font-semibold">Job Type</label>
              <select
                required
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
              >
                <option value="">Select job type</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            {/* Category */}
            <div className="relative">
              <label className="text-lg font-semibold">Category</label>
              <input
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter job category"
                className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button className="bg-yellow-400 text-black font-semibold text-lg px-6 py-2 rounded-full hover:bg-yellow-500 transition">
              + Post Job
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PostJob;
