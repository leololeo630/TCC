import { useState } from 'react';
import Input from '../components/login/Input';
import Button from '../components/login/Button';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Logging in with', { username, password });

        //Redireciona para a página principal após o login

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