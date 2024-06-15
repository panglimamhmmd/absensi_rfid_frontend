import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Absensi from './pages/Absensi';
import EditAbsensi from './pages/EditAbsensi';
import Register from './components/Register';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/add" element={<AddUser />} />
                    <Route path="/users/edit/:id" element={<EditUser />} />
                    <Route path="/absensi" element={<Absensi />} />
                    <Route path="/absensi/edit/:id" element={<EditAbsensi />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
