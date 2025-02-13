import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

const intUsers = [
  {
    id: "1",
    name: "John Doe",
    password: "123qwer",
    email: "imad@gmail.com",
    phone: "+1 234 567 890",
    role: "Job Seeker",
    experience: "Intermediate",
    selfDescription: "",
    skills: ["JavaScript", "React", "Node.js"],
    resume: "resume_john.pdf",
    profilePic: "/assets/pP1.jpg",
    linkedIn: "https://linkedin.com/in/johndoe",
    jobPreferences: "",
    appliedJobID: ["12s233", "sw23s3"],
    savedJobID: ["12123"],
  },
  {
    id: "2",
    name: "Tech Corp",
    email: "contact@techcorp.com",
    password: "123qwer",
    phone: "+1 987 654 321",
    role: "Employer",
    companySize: "500+",
    industry: "Software Development",
    companyWebsite: "https://techcorp.com",

    jobListings: [
      {
        jobTitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        category: "Development",
        skillsRequired: ["Python", "Django", "Machine Learning"],
        location: "Hybrid",
        jobType: "Full-Time",
        deadline: "12/01/2025",
        postedTime: "2025-02-11T13:53:23",
        applicantID: ["1"],
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deleniti atque omnis eum modi vitae iste. Vero, doloribus rerum pariatur accusamus cumque, iste at repellendus ipsam eos, iusto libero deleniti!",
        salaryRange: "$90,000 - $110,000",
        id: "sw23s3",
      },
      {
        jobTitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        category: "Design",
        skillsRequired: ["Figma", "Sketch", "User Research"],
        location: "Remote",
        jobType: "Contract",
        deadline: "20/01/2025",
        postedTime: "2025-02-01T13:53:23",
        applicantID: ["1"],
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deleniti atque omnis eum modi vitae iste. Vero, doloribus rerum pariatur accusamus cumque, iste at repellendus ipsam eos, iusto libero deleniti!",
        salaryRange: "$60,000 - $80,000",
        id: "12s233",
      },
    ],
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alicejohnson@example.com",
    phone: "+1 555 123 456",
    password: "123qwer",
    role: "Job Seeker",
    experience: "Junior",
    skills: ["HTML", "CSS", "JavaScript"],
    resume: "resume_alice.pdf",
    profilePic: "/assets/pP2.jpg",
    selfDescription: "",
    experiance: "",
    linkedIn: "https://linkedin.com/in/alicejohnson",
    jobPreferences: "",
    appliedJobID: ["12123"],
    savedJobID: ["12s233", "12s233"],
  },
  {
    id: "4",
    name: "InnovateX Solutions",
    email: "hr@innovatex.com",
    password: "123qwer",
    phone: "+1 666 789 012",
    role: "Employer",
    companySize: "200+",
    industry: "Marketing & Advertising",

    companyWebsite: "https://innovatex.com",
    jobListings: [
      {
        jobTitle: "Lorem ipsum dolor sit amet consectetur adipisicing",
        category: "Marketing",
        skillsRequired: ["SEO", "PPC", "Social Media"],
        location: "Remote",
        jobType: "Full-Time",
        deadline: "12/02/2025",
        postedTime: "2024-02-01T08:00:00",
        applicantID: ["3"],
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deleniti atque omnis eum modi vitae iste. Vero, doloribus rerum pariatur accusamus cumque, iste at repellendus ipsam eos, iusto libero deleniti!",
        salaryRange: "$70,000 - $90,000",
        id: "12123",
      },
    ],
  },
];

const UserDataContext = createContext();

function UserContext({ children }) {
  const [posts, setPosts] = useState("");
  const [users, setUsers] = useState(intUsers);

  useEffect(
    function () {
      setPosts(
        users
          .filter((user) => user.role.toLocaleLowerCase() === "employer")
          .flatMap((userEmp) =>
            userEmp.jobListings.map((job) => ({
              ...job,
              jobPoster: userEmp.email,
            }))
          )
      );
    },
    [users]
  );

  const value = {
    posts,
    setPosts,
    users,
    setUsers,
  };
  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export { UserContext, UserDataContext };
UserContext.propTypes = {
  children: PropTypes.node,
};
