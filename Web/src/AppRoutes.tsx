import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import User from './pages/User';
import Questao from './pages/Questao';
import Dashboard from './pages/Dashboard';
import Historico from './pages/Historico';
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/questao/:id" element={<Questao />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/historico" element={<Historico />} />
      </Routes>
    </Router>
  );
}
