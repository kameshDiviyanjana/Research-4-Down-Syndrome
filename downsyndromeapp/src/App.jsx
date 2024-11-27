// import { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import Login from "./componets/login";
// import HomePage from "./pages/HomePage";
// import Footer from './componets/Footer';
// import Heder from './componets/Heder';
// import Dashboard from "./componets/Dashboard ";
// import Move from "./componets/Move";
// import { AuthProvider } from "./componets/AuthProvider";
// import ProtectedRoute from "./componets/ProtectedRoute";
// import Layout from "./componets/Layout";
// function App() {
 

//   return (

//     <>
//       <AuthProvider>
//         <Router>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <Layout>
//                   <HomePage />
//                 </Layout>
//               }
//             />
//             <Route
//               path="/login"
//               element={
//                 <Layout>
//                   <Login />
//                 </Layout>
//               }
//             />
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/kkk"
//               element={
//                 <ProtectedRoute>
//                   <Move />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </Router>
//       </AuthProvider>
//     </>
//   );
// }



// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componets/login";
import HomePage from "./pages/HomePage";
import Dashboard from "./componets/Dashboard ";
import Move from "./componets/Move";
import { AuthProvider } from "./componets/AuthProvider";
import ProtectedRoute from "./componets/ProtectedRoute";
import Layout from "./componets/Layout";
import DashobordeLayout from "./layout/DashobordeLayout";
import PronunciationChecker from "./componets/Vioce";
import SideBarVoice from "./componets/voices/sideBarVoice";
import VoicesWord from "./componets/voices/VoicesWord";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashobordeLayout>
                  <Dashboard />
                </DashobordeLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/voice"
            element={
              <ProtectedRoute>
                <DashobordeLayout>
                  <SideBarVoice />
                </DashobordeLayout>
              </ProtectedRoute>
            }
          >
            <Route path="" element={<PronunciationChecker />} />
            <Route path="word" element={<VoicesWord />} />
          </Route>
          <Route
            path="/kkk"
            element={
              <ProtectedRoute>
                <Move />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;


