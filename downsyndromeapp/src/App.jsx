import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "../src/componets/login";
import HomePage from "./pages/HomePage";
import Footer from './componets/Footer';
import Heder from './componets/Heder';
import Dashboard from "./componets/Dashboard ";
import ProtectedRoute from "./utile/ProtectedRoute";
import Move from "./componets/Move";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const logStatus = localStorage.getItem("log") === "true";
    const loginTime = localStorage.getItem("loginTime");

    if (logStatus && loginTime) {
      const timePassed = Date.now() - parseInt(loginTime, 10);
      if (timePassed > 60000) {
        // Expire session after 1 minute
        localStorage.removeItem("log");
        localStorage.removeItem("loginTime");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, []);

  return (
    <>
      <Router>
        <Layout isAuthenticated={isAuthenticated}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<Dashboard />}
                />
              }
            >
              {/* Nested Route under Dashboard */}
              <Route path="kkk" element={<Move />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
      
    </>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";

  return (
    <>
      {(isLoginPage || isHomePage) && <Heder />}
      <main>{children}</main>
      {(isLoginPage || isHomePage) && <Footer />}
    </>
  );
}

export default App;

