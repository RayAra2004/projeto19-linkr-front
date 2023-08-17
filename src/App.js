import { BrowserRouter, Route, Routes } from "react-router-dom";
import Timeline from "./Pages/Timeline";
import SignIn from "./Pages/signin";
import SignUp from "./Pages/signup";
import { AuthProvider } from "./Contexts/AuthContext";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/timeline" element={<Timeline />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
