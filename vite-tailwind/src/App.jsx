import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ScrollToTop from "./utile/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <MainLayout />
    </BrowserRouter>
  );
};

export default App;
