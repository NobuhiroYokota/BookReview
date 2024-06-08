import './App.css';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import { BrowserRouter, Navigate, Route,Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import Profile from './Profile'
import NewReview from './NewReview';

function App() {

  const auth = useSelector((state)=> state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Home/Profile' element={<Profile/>} />
        <Route path='/Home/new' element={<NewReview/>}/>
        {auth ? (
          <>
            <Route path='/Home' element={<Home />} />
          </>
        ) : (
          <Route path='/' element={<Navigate to="/Login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
