import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "../src/Components/Home";
import ChooseUser from "../src/Components/ChooseUser";
import AdminSignin from "../src/Components/AdminSignin";
import StudentSignin from "../src/Components/StudentSignin";
import TeacherSignin from "../src/Components/TeacherSignin";
import AdminDashboard from "../src/Pages/Admin/Dashboard";
import StudentDashboard from "../src/Pages/Students/Dashboard";
import TeacherDashboard from "../src/Pages/Teachers/Dashboard";
import ProfileSection from "../src/Pages/Students/Profile";
import Classes from "../src/Pages/Admin/Class";
import Teachers from "../src/Pages/Admin/Teachers";
import Students from "../src/Pages/Admin/Student";
import Tasks from "../src/Pages/Admin/Task";
import SettingsProfile from "../src/Pages/Admin/SettingsProfile";
import Announcement from "../src/Pages/Admin/Announcement";
import AdminRegister from "../src/Components/AdminRegister"
import StudenntTasks from "../src/Pages/Students/Task";
import AnnouncementSection from "../src/Pages/Students/Announcement";
import ClassSction from "../src/Pages/Teachers/Class";
import StudentSection from "../src/Pages/Teachers/Students";
import TeacherSection from "../src/Pages/Teachers/Teachers";
import TeacherProfileSection from "../src/Pages/Teachers/Profile";
import TaskSection from "../src/Pages/Teachers/Task";
import CheckAnnouncementSection from "./Pages/Teachers/TeacherAnnouncement";
import { AdminRegisterLink } from './Styles/Styles';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/choose-user" element={<ChooseUser />} />

      {/* All the sign-in pages/routes */}
      
      <Route exact path="/admin-signIn" element={<AdminSignin />} />
        <Route exact path="/student-signIn" element={<StudentSignin />} />
        <Route exact path="/teacher-signIn" element={<TeacherSignin />} />
        <Route exact path="/admin/register" element={<AdminRegister />} />
        
        {/* All the dashboard routes */}
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/teacher/dashboard" element={<TeacherDashboard />} />        
        <Route exact path="/student/dashboard" element={<StudentDashboard />} />

        {/* Admin section here */}

        <Route exact path="/admin/classes" element={<Classes />} />
        <Route exact path="/admin/teachers" element={<Teachers />} />
        <Route exact path="/admin/students" element={<Students />} />
        <Route exact path="/admin/assignments" element={<Tasks />} />
        <Route exact path="/admin/communication" element={<Announcement />} />
        <Route exact path="/admin/settings" element={<SettingsProfile />} />

        
        {/* Students sections here  */}

        <Route exact path="/student/assignments" element={<StudenntTasks />} />
        <Route exact path="/student/communication" element={<AnnouncementSection/>} />
        <Route exact path="/student/settings" element={<ProfileSection />} />

        {/* Teachers sections here */}

        <Route exact path="/teacher/classes" element={<ClassSction />} />
        <Route exact path="/teacher/students" element={<StudentSection />} />
        <Route exact path="/teacher/teachers" element={<TeacherSection />} />
        <Route exact path="/teacher/assignments" element={<TaskSection />} />
        <Route exact path="/teacher/settings" element={<TeacherProfileSection/>} />
        <Route exact path="/teacher/communication" element={<CheckAnnouncementSection />} />

      </Routes>
    </Router>
  );
};

export default App;