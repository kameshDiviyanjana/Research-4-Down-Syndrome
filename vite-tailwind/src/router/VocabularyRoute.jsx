import React from 'react'
import { Outlet, Route, Routes } from "react-router-dom";
import Vocabulary from '../features/vocabulary';
import Word from '../features/vocabulary/Word';
import Listword from '../features/vocabulary/componets/Listword';
import { AuthProvider } from '../auth/AuthProvider';
function VocabularyRoute() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="" element={<Vocabulary />} />
          <Route path="word" element={<Word />} />
          <Route path="list-word" element={<Listword />} />
        </Routes>
      </AuthProvider>
      <Outlet/>
    </div>
  );
}

export default VocabularyRoute
