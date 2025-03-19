import { Outlet, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import WritingHome from "../features/writing/WritingHome";

function WritingRoutes() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="writing-home" element={<WritingHome />} />
        </Routes>
      </AuthProvider>
      <Outlet />
    </div>
  );
}

export default WritingRoutes
