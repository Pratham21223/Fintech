import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AuthDocs from "./pages/AuthDocs";
import TransactionDocs from "./pages/TransactionDocs";
import DashboardDocs from "./pages/DashboardDocs";
import UserDocs from "./pages/UserDocs";
import JwtAuth from "./pages/concepts/JwtAuth";
import Rbac from "./pages/concepts/Rbac";
import DataModels from "./pages/concepts/DataModels";
import Aggregation from "./pages/concepts/Aggregation";
import ProjectStructure from "./pages/architecture/ProjectStructure";
import Environment from "./pages/architecture/Environment";
import ErrorHandling from "./pages/ErrorHandling";
import QuickStart from "./pages/QuickStart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/concepts/jwt" element={<JwtAuth />} />
          <Route path="/concepts/rbac" element={<Rbac />} />
          <Route path="/concepts/data-models" element={<DataModels />} />
          <Route path="/concepts/aggregation" element={<Aggregation />} />
          <Route
            path="/architecture/project-structure"
            element={<ProjectStructure />}
          />
          <Route path="/architecture/environment" element={<Environment />} />
          <Route path="/auth" element={<AuthDocs />} />
          <Route path="/transactions" element={<TransactionDocs />} />
          <Route path="/dashboard" element={<DashboardDocs />} />
          <Route path="/users" element={<UserDocs />} />
          <Route path="/error-handling" element={<ErrorHandling />} />
          <Route path="/quick-start" element={<QuickStart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
