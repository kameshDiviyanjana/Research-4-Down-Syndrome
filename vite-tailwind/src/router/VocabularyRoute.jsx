import React from 'react'
import { Outlet, Route, Routes } from "react-router-dom";
import Vocabulary from '../features/vocabulary';
import Word from '../features/vocabulary/Word';
import Listword from '../features/vocabulary/componets/Listword';
import { AuthProvider } from '../auth/AuthProvider';
import DefaulteLsitWord from '../features/vocabulary/componets/DefaulteLsitWord';
import WordLearn from '../features/vocabulary/componets/wordlaern';
import StageTwo from '../features/vocabulary/componets/StageTwo';
import StageThree from '../features/vocabulary/componets/StageThree';
import AllWordList from '../features/vocabulary/componets/AllWordList';
import AlphabetView from '../features/vocabulary/componets/AlphabetView';
import SelectCategory from '../features/vocabulary/componets/selectCategory';
import AlphabetLearning from '../features/vocabulary/componets/Alphabet -learing';
import Dectation from '../features/vocabulary/componets/Dectation';
import TestDashbord from '../features/vocabulary/componets/TestDashbord';
function VocabularyRoute() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="" element={<Vocabulary />} />
          <Route path="word" element={<Word />} />
          <Route path="list-word" element={<Listword />} />
          <Route path="list-car" element={<DefaulteLsitWord />} />
          <Route path="word-learn/:id" element={<WordLearn />} />
          <Route path="stage-two" element={<StageTwo />} />
          <Route path="stage-three" element={<StageThree />} />
          <Route path="list-all" element={<AllWordList />} />
          <Route path="aplpabte" element={<AlphabetView />} />
          <Route path="category" element={<SelectCategory />} />
          <Route path="alohabet-learing" element={<AlphabetLearning />} />
          <Route path="dectation" element={<Dectation />} />
          <Route path="quize" element={<TestDashbord />} />
        </Routes>
      </AuthProvider>
      <Outlet />
    </div>
  );
}

export default VocabularyRoute
