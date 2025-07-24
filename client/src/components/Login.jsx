import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    // e.preventDefault();

    // try {
    //   const res = await fetch('http://localhost:5050/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   if (!res.ok) {
    //     navigate('/unauthorized'); // ❌ Login failed
    //     return;
    //   }

    //   const data = await res.json();
    //   localStorage.setItem('token', data.token); // ✅ Save JWT token
    //   navigate('/agent'); // ✅ Login successful

    // } catch (error) {
    //   console.error('Login error:', error);
    //   navigate('/unauthorized'); // ❌ Network or other error
    // }
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/agent'); // ✅ Successful login
    } catch (err) {
      navigate('/unauthorized'); // ❌ Failed login
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        // type="username"
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
