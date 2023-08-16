import SignIn from "./pages/signin";
import SignUp from "./pages/signup"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    
<>



 <BrowserRouter>
        <Routes>
           <Route path="/" element={<SignIn />} />
           <Route path="/sign-up" element={<SignUp />} /> 


        </Routes>
      </BrowserRouter> 
</>
  );
}

export default App;
