import './App.css'
import Dashboard from './Dashboard.jsx';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import PageNotFound from './PageNotFound.jsx';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {useState} from "react";
import RefreshHandler from './RefreshHandler.jsx';
import SignUp from './SignUp.jsx'
import Login from "./Login.jsx";

const GoogleAuthWrapper = () => (
  <GoogleOAuthProvider clientId="196236797601-ids2nicgqu77ni97lhmt48nuo7hamjs0.apps.googleusercontent.com">
    <Login />
  </GoogleOAuthProvider>
)

const PrivateRoute = ({isAuthenticated, element}) => (
  isAuthenticated ? element : <Navigate to="/login" />
)

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
       <BrowserRouter> 
       <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
       <Routes>
        <Route path="/login" element={<GoogleAuthWrapper/>}/>
        <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/Signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Dashboard/>}/>}/>
        <Route path="*" element={<PageNotFound/>}/>
       </Routes>
       </BrowserRouter>
  )
}
export default App
