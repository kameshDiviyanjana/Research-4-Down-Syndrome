import React from 'react'
import { Outlet, Route, Routes } from "react-router-dom";
import Vocabulary from '../features/vocabulary';
import Word from '../features/vocabulary/Word';
import Listword from '../features/vocabulary/componets/Listword';
import { AuthProvider } from '../auth/AuthProvider';
import DefaulteLsitWord from '../features/vocabulary/componets/DefaulteLsitWord';
import WordLearn from '../features/vocabulary/componets/wordlaern';
function VocabularyRoute() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="" element={<Vocabulary />} />
          <Route path="word" element={<Word />} />
          <Route path="list-word" element={<Listword />} />
          <Route path="list-car" element={<DefaulteLsitWord />} />
          <Route path="word-learn/:id" element={<WordLearn/>} />
        </Routes>
      </AuthProvider>
      <Outlet />
    </div>
  );
}

export default VocabularyRoute
