import React from 'react'
import { Route, Routes } from "react-router-dom";
import Vocabulary from '../features/vocabulary';
import Word from '../features/vocabulary/Word';

function VocabularyRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Vocabulary />} />
        <Route path="/word" element={<Word />} />
      </Routes>
    </div>
  );
}

export default VocabularyRoute
