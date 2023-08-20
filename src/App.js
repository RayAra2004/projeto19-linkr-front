import { BrowserRouter, Route, Routes } from "react-router-dom";
import Timeline from "./Pages/Timeline";
import SignIn from "./Pages/signin";
import SignUp from "./Pages/signup";
import { AuthProvider } from "./Contexts/AuthContext";
import TrendingPage from "./Pages/TrendingPage";
import { ContextProvider } from "./Contexts/Context";
import { UpdateSearchBar } from "./Contexts/SerachBar";

export default function App() {

  return (
    <AuthProvider>
      <UpdateSearchBar>
        <ContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/hashtag/:hashtag" element={<TrendingPage />} />
            </Routes>
          </BrowserRouter>
        </ContextProvider>
      </UpdateSearchBar>
    </AuthProvider>
  );
}
