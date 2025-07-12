'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // ✅ খুব গুরুত্বপূর্ণ
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log('LOGIN RESPONSE:', data); // ✅ এটা অ্যাড করো

    if (data.success) {
      localStorage.setItem('token', data.token); // ✅ এটা টোকেন সেভ করে
      router.push('/dashboard');
    } else {
      setMsg(data.message || 'Login failed');
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
