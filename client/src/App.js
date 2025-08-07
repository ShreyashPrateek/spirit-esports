import { useState } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    const res = await axios.post('https://your-backend.vercel.app/api/auth/register', form);
    alert(res.data.message);
  };

  const login = async () => {
    const res = await axios.post('https://your-backend.vercel.app/api/auth/login', form);
    alert('JWT: ' + res.data.token);
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" onChange={handleChange} placeholder="Password" type="password" />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
