import { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { UserDataContext } from "../context/UserContext";

function MainPost() {
  const { posts } = useContext(UserDataContext);
  const [showModal, setShowModal] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [sortedPost, setSortedPost] = useState([]);

  useEffect(() => {
    if (!posts) return;

    const filteredAndSortedPosts = posts
      .filter((post) => {
        return (
          (jobTypeFilter
            ? post?.jobType?.toLowerCase() === jobTypeFilter.toLowerCase()
            : true) &&
          (categoryFilter
            ? post?.category
                ?.toLowerCase()
                .includes(categoryFilter.toLowerCase())
            : true) &&
          (locationFilter
            ? post?.location?.toLowerCase() === locationFilter.toLowerCase()
            : true)
        );
      })
      .sort((a, b) => new Date(b.postedTime) - new Date(a.postedTime));

    setSortedPost(filteredAndSortedPosts);
  }, [posts, jobTypeFilter, categoryFilter, locationFilter]);

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

  return (
    <div className="bg-gray-700 overflow-y-scroll p-4 pb-10 sm:pb-4 relative">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 grow mb-4">
        <div className="relative flex-1 max-w-[300px]">
          <input
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
            placeholder="Search category..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-800 appearance-none text-white"
          />
          <i className="fas fa-briefcase absolute left-3 top-3.5 text-gray-400 text-lg"></i>
        </div>

        <div className="relative flex-1 max-w-[300px]">
          <select
            onChange={(e) => setLocationFilter(e.target.value)}
            value={locationFilter}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-800 appearance-none text-white"
          >
            <option value="">All Locations</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
          </select>
          <i className="fas fa-map-marker-alt absolute left-3 top-3.5 text-gray-400 text-lg"></i>
        </div>

        <div className="relative flex-1 max-w-[300px]">
          <select
            onChange={(e) => setJobTypeFilter(e.target.value)}
            value={jobTypeFilter}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-800 appearance-none text-white"
          >
            <option value="">All Job Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="freelance">Freelance</option>
          </select>
          <i className="fas fa-file-alt absolute left-3 top-3.5 text-gray-400 text-lg"></i>
        </div>
      </div>

      {/* Job Listings */}
      <div className="text-white space-y-3 pb-10 sm:pb-0">
        {sortedPost.length > 0 ? (
          sortedPost.map((post, index) => (
            <div
              key={index}
              className="p-2 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-900 duration-300"
            >
              <div className="flex justify-between">
                <p className="text-cyan-400 text-sm">
                  Posted {calcTime(post.postedTime)}
                </p>
                <p className="text-red-400 text-md font-mono">
                  Deadline {post.deadline}
                </p>
              </div>
              <p
                className="text-lg sm:text-xl font-bold mt-2 hover:text-green-500 hover:underline cursor-pointer duration-300"
                onClick={() => setShowModal(post)}
              >
                {post.jobTitle}
              </p>
              <div className="flex justify-between items-center mt-2 max-w-max gap-5">
                <p className="text-indigo-400 font-medium mt-1">Fixed-price</p>
                <p className="text-green-400 font-bold mt-2">
                  {post.salaryRange}
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                {post.skillsRequired?.map((skill, i) => (
                  <p
                    key={i}
                    className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-4 text-nowrap">
                <span className="bg-gray-100 text-green-700 px-1.5 sm:px-2.5 py-1 rounded-full text-[0.7rem] sm:text-sm flex items-center gap-1">
                  <i className="fas fa-check-circle text-green-500"></i> Payment
                  Verified
                </span>
                <span className="px-2.5 py-1 rounded-full text-[0.7rem] sm:text-sm bg-cyan-700 flex items-center gap-1">
                  <i className="fa-solid fa-location-dot"></i> {post.location}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[0.7rem] sm:text-sm bg-lime-600 flex items-center gap-1 uppercase">
                  <i className="fas fa-file-alt"></i> {post.jobType}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[0.7rem] sm:text-sm flex items-center gap-1 uppercase bg-yellow-600">
                  <i className="fas fa-briefcase  left-3 top-3.5text-lg"></i>{" "}
                  {post.category}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <img
              src="/assets/noSearchFound.png"
              alt="No Results"
              className="max-w-[300px]"
            />
          </div>
        )}
      </div>

      {showModal && <Modal setShowModal={setShowModal} post={showModal} />}
    </div>
  );
}

export default MainPost;
