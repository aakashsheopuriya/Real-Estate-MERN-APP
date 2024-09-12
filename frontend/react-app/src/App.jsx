import "./App.css";
import Login from "./views/publicView/Login";
import Signup from "./views/AuthenticateView/Signup";
import UserProfile from "./views/AuthenticateView/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebsiteLayout from "./views/AuthenticateView/WebsiteLayout";
import UserDashboard from "./views/AuthenticateView/UserDashboard";
import CreatProperty from "./views/AuthenticateView/Seller/CreatProperty";
import MyProperty from "./views/AuthenticateView/Seller/MyProperty";
import NoPage from "./views/publicView/NoPage";
import PropertyDetails from "./views/AuthenticateView/Seller/PropertyDetails";
import Account from "./views/AuthenticateView/pages/Account";
import Forgot from "./views/publicView/Forgot";
import PropertyEdit from "./views/AuthenticateView/Seller/PropertyEdit";
import HelpAndSupport from "./views/AuthenticateView/pages/HelpAndSupport";
import PrivacyAndPolicies from "./views/AuthenticateView/pages/PrivacyAndPolicies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/forgot-password" element={<Forgot />}></Route>
        <Route path="/Signup-Now" element={<Signup />}></Route>
        <Route path="/dashboard" element={<WebsiteLayout />}>
          <Route index element={<UserDashboard />}></Route>
          <Route path="profile" element={<UserProfile />}></Route>
          <Route path="create" element={<CreatProperty />}></Route>
          <Route path="my-property" element={<MyProperty />}></Route>
          <Route
            path="get-specific-property/:id"
            element={<PropertyDetails />}
          ></Route>
          <Route path="property/:id/edit" element={<PropertyEdit />}></Route>
          <Route path="account-information" element={<Account />}></Route>
          <Route path="help-and-support" element={<HelpAndSupport />}></Route>
          <Route
            path="privacy-and-policies"
            element={<PrivacyAndPolicies />}
          ></Route>

          <Route path="*" element={<NoPage />}></Route>
        </Route>
        <Route path="*" element={<NoPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
