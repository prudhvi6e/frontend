import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/index";
import DashBoard from "./pages/Dashboard/index";
// import SafetyDigitilization from './pages/SafetyDigitilization/index.jsx';
import WorkPermit from "./pages/WorkPermits/index";
import Modules from "./pages/Modules/index";
import SingleWorkPermit from "./pages/WorkPermits/SingleWorkPermit";
// import AllKySheets from './pages/AllKYSheets/index.js';
import MainLayout from "./components/mainLayout/index";
import MarutiHomePage from "./components/MarutiHomePage/index";
import SecondPage from "./components/Screen2/Index";
import Kyhazard from "./components/KY Hazard/Index";

function AppRoutes() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="module" element={<Modules />} />
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="cards/dashboard" element={<DashBoard />} />
            <Route path="dashboard/work-permit" element={<WorkPermit />} />
            <Route path="work-permit" element={<WorkPermit />} />
            <Route path="work-permit/:id" element={<SingleWorkPermit />} />
          </Route>
          <Route path="home" element={<MarutiHomePage />}></Route>
          <Route path="cards" element={<SecondPage />}></Route>
          <Route path="KYHazard" element={<Kyhazard />}></Route>
          <Route path="cards/KYHazard" element={<Kyhazard />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default AppRoutes;
