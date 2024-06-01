import './App.css';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import BookList from './BookList';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path='BookList' element ={<BookList/>}/> */}
        <Route path='/Home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
