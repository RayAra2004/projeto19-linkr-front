import { BrowserRouter, Route, Routes } from "react-router-dom";
import Timeline from "./Pages/Timeline";

export default function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/timeline" element={<Timeline/>}/>
      </Routes>
    </BrowserRouter>
   </>
  );
}