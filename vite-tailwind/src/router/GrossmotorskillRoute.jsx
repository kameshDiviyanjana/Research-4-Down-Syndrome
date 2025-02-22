import React from 'react'
import { Outlet, Route, Routes } from "react-router-dom";
import Vocabulary from '../features/vocabulary';
import Word from '../features/vocabulary/Word';
import Listword from '../features/vocabulary/componets/Listword';
import { AuthProvider } from '../auth/AuthProvider';
import Grossmotorskills from '../features/motor-skills';
import Grossmotorskill from '../features/motor-skills/skill';
import VideoUpload from '../features/motor-skills/VideoUpload';
function GrossmotorskillRoute() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="" element={<Grossmotorskills />} />
          <Route path="video-grossmotor" element={<Grossmotorskill />} />
          <Route path="list-video" element={<VideoUpload />} />
        </Routes>
      </AuthProvider>
      <Outlet/>
    </div>
  );
}

export default GrossmotorskillRoute
