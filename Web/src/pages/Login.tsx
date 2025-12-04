import { useState } from 'react';
import Input from '../components/login/Input';
import Button from '../components/login/Button';
import { login } from '../services/login';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Logging in with', { username, password });
        try {
            const response = await login(username, password);
            localStorage.setItem('authToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);

            navigate('/user');
        }
        catch (error) {
            console.error('Login failed:', error);
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg space-y-20">
                <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
                    Login
                </h1>
                <form className="space-y-8" onSubmit={handleLogin}>
                    <Input
                        type='text'
                        placeholder='email'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        type='password'
                        placeholder='senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type='submit'>Entrar</Button>
                </form>
            </div>
        </div>
    )
}