'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setData({ message: "Unauthorized. Please login." });
      return;
    }

    fetch('/api/private', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success) {
          // Token invalid → redirect to login
          router.push('/login');
        } else {
          setData(json);
        }
      })
      .catch(err => {
        setData({ message: "Server error" });
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Dashboard</h1>
      {data ? (
        <pre
          style={{
            background: '#111',
            color: '#0f0',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
