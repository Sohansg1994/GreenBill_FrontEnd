
import { BrowserRouter, Route, Routes } from "react-router-dom";

import * as React from 'react';
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import AppAppBar from "./pages/modules/views/AppAppBar";









function App() {
  return (
    <div className="App">
       <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signIn" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
       
       </BrowserRouter>
      
    
   
      
    </div>
  );
}

export default App;
