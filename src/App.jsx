
import './App.css';
import Router from './Router';

const App = () => {
  return (
  
      <Router />
  
  );
};

export default App;

// src/App.jsx

// import { Routes, Route } from 'react-router-dom';

// // Layout Components
// import AuthLayout from './layouts/auth';
// import PortalLayout from './layouts/portal';

// // Page & Component Imports
// import Login from './pages/login';
// import Home from './pages/home';
// import List from './List';
// import Contact from './Contact';
// import CreateUser from './Tables/components/CreateUser';
// import UserDetail from './Tables/components/UserDetail';

// import './App.css';

// function App() {
//   return (
//     <Routes>
//       {/* Routes for Authentication Pages (e.g., Login) */}
//       <Route element={<AuthLayout />}>
//         <Route path="/login" element={<Login />} />
//       </Route>

//       {/* Routes for the Main Application Portal */}
//       <Route element={<PortalLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/Contact" element={<Contact />} />
//         <Route path="/List" element={<List />} />

//         {/* --- သင် အသစ်ထပ်ထည့်ထားသော ROUTES များ --- */}
//         <Route path="/List/create-user" element={<CreateUser />} />
//         <Route path="/List/user/:id" element={<UserDetail />} /> 
//         {/* Note: path ကို user/:id ဟု ပိုရှင်းလင်းအောင် ပြောင်းလဲထားပါသည် */}
//       </Route>
//     </Routes>
//   );
// }

// export default App;


