import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/agent'); 
    } catch (err) {
      navigate('/unauthorized')
      console.log(err)
      ; 
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
