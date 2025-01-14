import React from 'react'
import { Outlet, Route, Routes } from "react-router-dom";
import Vocabulary from '../features/vocabulary';
import Word from '../features/vocabulary/Word';
import Listword from '../features/vocabulary/componets/Listword';
import { AuthProvider } from '../auth/AuthProvider';
import Grossmotorskills from '../features/motor-skills';
function GrossmotorskillRoute() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="" element={<Grossmotorskills />} />
          <Route path="word" element={<Word />} />
          <Route path="list-word" element={<Listword />} />
        </Routes>
      </AuthProvider>
      <Outlet/>
    </div>
  );
}

export default GrossmotorskillRoute
