import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import NotFound from "../pages/NotFound";
import SkillDevHome from "../pages/SkillDevHome";
import Login from "../pages/Login";
import VocabularyRoute from "./VocabularyRoute";
import { AuthProvider } from "../auth/AuthProvider";
import ProtectedRoute from "../auth/ProtectedRoute";
import GrossmotorskillRoute from "./GrossmotorskillRoute";
import MathskillRoute from "./MathskillsRoute";
import WritingRoutes from "./WritingRoutes";
const Router = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/skills" element={<SkillDevHome />} />
          <Route path="/vocabulary/*" element={<VocabularyRoute />} />
          <Route path="/grossmotor/*" element={<GrossmotorskillRoute />} />
          <Route path="/math/*" element={<MathskillRoute />} />
          <Route path="/write/*" element={<WritingRoutes />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default Router;
