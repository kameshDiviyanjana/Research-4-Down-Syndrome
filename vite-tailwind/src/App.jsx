import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
};

export default App;
