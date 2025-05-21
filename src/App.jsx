
// import './App.css'
// import Login from './login'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./Dashboard";
// import Home from './Home';
// import About from './About';
// import Promotion from './Promotion';
// import List from './List';
// import Contact from './Contact';


// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
      
//          <Route path="/Home" element={<Home/>} />
//          <Route path="/About" element={<About />} />
//          <Route path="/Promotion" element={<Promotion />} />
//          <Route path="/List" element={<List />} />
//          <Route path="/Contact" element={<Contact/>} />
//         <Route path="/Dashboard" element={<Dashboard />} />
      
       
//       </Routes>
//     </Router>
//   );
// };

// export default App
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './login';
import Home from './Home';
import List from './List';
import Contact from './Contact';
import PrivateRoute from './components/PrivateRoute'; 
import PublicRoute from './components/PublicRoute';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute> }/>

       
        <Route path="/Home" element={
          <PrivateRoute><Home /></PrivateRoute>
        } />
      
        
        <Route path="/List" element={
          <PrivateRoute><List /></PrivateRoute>
        } />

        <Route path="/Contact" element={
          <PrivateRoute><Contact /></PrivateRoute>
        } />
       
      </Routes>
    </Router>
  );
};

export default App;

