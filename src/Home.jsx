import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Otp from "./Otp";
import ForgetpasswordOtp from "./ForgetPasswordOtp";
import ForgetPasswordSet from "./ForgetPasswordSet";
import Logo from "./Logo";
const Home= () => {
  return (
    <div>
     <Logo/>
      <Routes>
        <Route path="/otp" element={<Otp />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetpasswordOtp />} />
        <Route path="/setforgetpassword" element={<ForgetPasswordSet />} />
      </Routes>
    </div>
  );
};

export default Home;
