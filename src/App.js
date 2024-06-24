import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Absensi from './pages/Absensi';
import EditAbsensi from './pages/EditAbsensi';
import Register from './components/Register';
import Rekapitulasi from './pages/Rekapitulasi';
import MonthlyRekap from './pages/MonthlyRekap';
import UserRekap from './pages/UserRekap';
function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/index" redirectTo="/" />
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/add" element={<AddUser />} />
                    <Route path="/users/edit/:id" element={<EditUser />} />
                    <Route path="/absensi" element={<Absensi />} />
                    <Route path="/absensi/edit/:id" element={<EditAbsensi />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/rekapitulasi" element={<Rekapitulasi />} />
                    <Route
                        path="/rekapitulasi/details"
                        element={<MonthlyRekap />}
                    />
                    <Route
                        path="/rekapitulasi/details/users"
                        element={<UserRekap />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
