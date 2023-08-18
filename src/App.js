import { BrowserRouter, Route, Routes } from "react-router-dom";
import Timeline from "./Pages/Timeline";
import SignIn from "./Pages/signin";
import SignUp from "./Pages/signup";
import { AuthProvider } from "./Contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
