import logo from "./logo.svg";
import "./App.css";
import FirstApp from "./FirstApp";
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

function App() {
  return (
    // <div>
    //   {/* <Login/> */}
    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React by durgesh sir at universal ,vijaynagarm campus.
    //     </a>
    //     <FirstApp/>

    //   </header> */}
    //   {/* <Signup /> */}

    //   <UserProfile/>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<UserDashboard />}></Route>
          <Route path="/profile" element={<UserProfile />}></Route>
          <Route path="/create" element={<CreatProperty />}></Route>
          <Route path="/my-property" element={<MyProperty />}></Route>
          <Route path="/get-specific-property" element={<PropertyDetails />}></Route>

          <Route path="*" element={<NoPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
