import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import SignInPage from './pages/signInpage/SignInPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashBoard from './pages/dashboard/DashBoard';

function App() {
  return (
    <div className="App">
       <Router>
         <Routes>
           <Route path='/' element={<SignInPage/>}/>
           <Route path='/register' element={<RegisterPage/>}/>
           <Route path='/dashboard' element={<DashBoard/>}/>
         </Routes>
       </Router>
    </div>
  );
}

export default App;
