
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import List from './List';
import Contact from './Contact';
import AuthLayout from './layouts/auth';
import PortalLayout from './layouts/portal';


 import CreateUser from "./Tables/userManagement/CreateUser";
 import UserDetail from "./Tables/userManagement/UserDetail";
const Router = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PortalLayout/>}>
                <Route
                    path='/'
                    element={<Home />}
                />
                <Route
                    path='/Contact'
                    element={<Contact />}
                />
                <Route
                    path='/List'
                    element={<List />}
                />
                
                <Route
                    path='/List/create-user'
                    element={<CreateUser />}
                />
                <Route
                    path='/List/create-user/:id'
                    element={<UserDetail />}
                />
            
            </Route>
        </Routes>
    );
}

export default Router;


