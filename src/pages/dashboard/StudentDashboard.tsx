import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StudentSidebar from "@/components/navigation/StudentSidebar";
import StudentCourses from "@/components/student/StudentCourses";
import StudentBillings from "@/components/student/StudentBillings";
import StudentProfile from "@/components/student/StudentProfile";

const StudentDashboard = () => {
  return (
    <DashboardLayout 
      sidebar={<StudentSidebar />} 
      title="Student Dashboard"
      showSearch={true}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/student/courses" replace />} />
        <Route path="/courses" element={<StudentCourses />} />
        <Route path="/billings" element={<StudentBillings />} />
        <Route path="/profile" element={<StudentProfile />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StudentDashboard;