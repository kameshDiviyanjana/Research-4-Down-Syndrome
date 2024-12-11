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
import Draw from "./pages/Draw";
import GrossMotorSkill from "./pages/GrossMotorSkill";
import MathPage from "./pages/MathPage";

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
            path="/draw"
            element={
              <ProtectedRoute>
                <DashobordeLayout>
                  <Draw />
                </DashobordeLayout>
              </ProtectedRoute>
            }
          >
            {/* <Route path="" element={<PronunciationChecker />} />
            <Route path="word" element={<VoicesWord />} /> */}
          </Route>
          <Route
            path="/skills"
            element={
              <ProtectedRoute>
                <DashobordeLayout>
                  {" "}
                  <GrossMotorSkill />
                </DashobordeLayout>
              </ProtectedRoute>
            }
          >
            {/* <Route path="" element={<PronunciationChecker />} />
            <Route path="word" element={<VoicesWord />} /> */}
          </Route>

          <Route
            path="/math"
            element={
              <ProtectedRoute>
                <DashobordeLayout>
                  <MathPage />
                </DashobordeLayout>
              </ProtectedRoute>
            }
          >
            {/* <Route path="" element={<PronunciationChecker />} />
            <Route path="word" element={<VoicesWord />} /> */}
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
