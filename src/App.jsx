import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Homepage"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const MainPost = lazy(() => import("./components/MainPost"));
const SavedJobs = lazy(() => import("./pages/SavedJobs"));
const Application = lazy(() => import("./pages/Application"));
const AppliedJobs = lazy(() => import("./pages/AppliedJobs"));
const Setting = lazy(() => import("./pages/Setting"));
const DashboardJobSeeker = lazy(() => import("./pages/DashboardJobSeeker"));
const DashboardEmployee = lazy(() => import("./pages/DashboardEmployee"));
const PostJob = lazy(() => import("./components/Employee/PostJob"));
const Applicants = lazy(() => import("./components/Employee/Applicants"));
const PostedJobs = lazy(() => import("./components/Employee/PostedJobs"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Job seeker */}

          <Route
            path="/dashboard/:jobSeekerId"
            element={<DashboardJobSeeker />}
          >
            <Route index element={<WelcomePage />} />
            <Route path="home" element={<MainPost />} />
            <Route path="job" element={<AppliedJobs />} />
            <Route path="saved" element={<SavedJobs />} />
            <Route path="application" element={<Application />} />
            <Route path="setting" element={<Setting />} />
          </Route>

          {/* Employee */}

          <Route
            path="/dashboardEmployee/:employeeId"
            element={<DashboardEmployee />}
          >
            <Route index element={<PostJob />} />
            <Route path="postJobs" element={<PostJob />} />
            <Route path="postedJobs" element={<PostedJobs />} />
            <Route path="applicants" element={<Applicants />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
