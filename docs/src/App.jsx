import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AuthDocs from "./pages/AuthDocs";
import TransactionDocs from "./pages/TransactionDocs";
import DashboardDocs from "./pages/DashboardDocs";
import UserDocs from "./pages/UserDocs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthDocs />} />
          <Route path="/transactions" element={<TransactionDocs />} />
          <Route path="/dashboard" element={<DashboardDocs />} />
          <Route path="/users" element={<UserDocs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
