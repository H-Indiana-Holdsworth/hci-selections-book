import React, { useEffect, useState } from 'react';

export default function Me() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const loadData = async () => {
      const resp = await fetch(`.netlify/functions/me?token=${localStorage.getItem('token')}`);
      const data = await resp.json();
      setId(data.id);
      setEmail(data.email);
    };
    loadData();
  }, []);
  return (
    <div>
      <h1>Me</h1>
      <h2>{id}</h2>
      <h2>{email}</h2>
    </div>
  );
}
