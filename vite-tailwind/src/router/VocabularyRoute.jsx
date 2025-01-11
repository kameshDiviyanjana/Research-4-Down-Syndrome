import React from 'react'
import { Route, Routes } from "react-router-dom";
import Vocabulary from '../features/vocabulary';
import Word from '../features/vocabulary/Word';
import Listword from '../features/vocabulary/componets/Listword';
function VocabularyRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Vocabulary />} />
        <Route path="/word" element={<Word />} />
        <Route path="/list-word" element={<Listword/>} />
      </Routes>
    </div>
  );
}

export default VocabularyRoute
