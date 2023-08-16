
import SignIn from "./pages/signin";
import SignUp from "./pages/signup"

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Timeline from "./Pages/Timeline";

export default function App() {
  return (

    
<>



 <BrowserRouter>
        <Routes>
           <Route path="/" element={<SignIn />} />
           <Route path="/signup" element={<SignUp />} /> 
 <Route path="/timeline" element={<Timeline/>}/>

        </Routes>
      </BrowserRouter> 
</>

  );
}