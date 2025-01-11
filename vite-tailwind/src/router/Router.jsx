import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import NotFound from "../pages/NotFound";
import SkillDevHome from "../pages/SkillDevHome";
import Login from "../pages/Login";
import VocabularyRoute from "./VocabularyRoute";

const Router = () => {
  return (
    <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/skills" element={<SkillDevHome />} />
     
      <Route path="/vocablary/*" element={<VocabularyRoute />} />
    </Routes>
  );
};

export default Router;
