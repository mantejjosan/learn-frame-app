import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import EducatorSidebar from "@/components/navigation/EducatorSidebar";
import EducatorCourses from "@/components/educator/EducatorCourses";
import EducatorBillings from "@/components/educator/EducatorBillings";
import EducatorAnalytics from "@/components/educator/EducatorAnalytics";
import EducatorProfile from "@/components/educator/EducatorProfile";

const EducatorDashboard = () => {
  return (
    <DashboardLayout 
      sidebar={<EducatorSidebar />} 
      title="Educator Dashboard"
      showSearch={false}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/educator/courses" replace />} />
        <Route path="/courses" element={<EducatorCourses />} />
        <Route path="/billings" element={<EducatorBillings />} />
        <Route path="/analytics" element={<EducatorAnalytics />} />
        <Route path="/profile" element={<EducatorProfile />} />
      </Routes>
    </DashboardLayout>
  );
};

export default EducatorDashboard;