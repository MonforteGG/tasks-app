import axios from "axios";
import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';


function LoginCard() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', {
                username: username,
                password: password
            });
            login(response.data.token.access_token);  
            navigate('/');
        } catch (error) {
            setMessage('Login failed');
            console.error(error);  
        }
    };
    return ( 
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <form  onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="block py-2 px-3 mb-4 w-full text-black"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    autoFocus
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="block py-2 px-3 mb-4 w-full text-black"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button className="
                bg-green-500 
                hover:bg-green-700 
                text-white font-bold py-1 px-2 rounded"
                >
                    LOGIN
                </button>
            </form>
        </div>
    );
}

export default LoginCard;