import React from 'react'
import { Outlet, Route, Routes } from "react-router-dom";
import Vocabulary from '../features/vocabulary';
import Word from '../features/vocabulary/Word';
import Listword from '../features/vocabulary/componets/Listword';
import { AuthProvider } from '../auth/AuthProvider';
import Grossmotorskills from '../features/motor-skills';
import Grossmotorskill from '../features/motor-skills/skill';
import VideoUpload from '../features/motor-skills/VideoUpload';
import MainPage from '../features/motor-skills/MainPage';
import SystemPage from '../features/motor-skills/SystemPage';
import NextTaskPage from '../features/motor-skills/NextTaskPage';
function GrossmotorskillRoute() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="" element={<Grossmotorskills />} />
          <Route path="video-grossmotor" element={<Grossmotorskill />} />
          <Route path="list-video" element={<VideoUpload />} />
          <Route path="main" element={<MainPage />} />
          <Route path="system" element={<SystemPage />} />
          <Route path="next-task" element={<NextTaskPage />} />
        </Routes>
      </AuthProvider>
      <Outlet />
    </div>
  );
}

export default GrossmotorskillRoute
