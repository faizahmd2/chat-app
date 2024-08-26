'use client';

import React, { useState } from 'react';
import { db, tx, id } from './services/instantdbService'
import { pageStyle } from '../styles';
import HomePage from './home';
import MyLoader from './components/loader';

function App() {
  const { isLoading, user, error } = db.useAuth();
  const { data } = db.useQuery({users: { $: {
    where: {
      username: user ? user.email : "-1",
    },
  }}});
  
  if (isLoading) {
    return <MyLoader />
  }
  if (error) {
    return <div>Something went wrong!</div>;
  }
  if (user) {
    if(data && !data.users.length) {
      let name = user.email.split("@")[0];
      let usr = {
        id: user.id,
        name: name,
        username: user.email,
        avatarUrl: `https://robohash.org/${name}.png`,
        status: 1,
        createdAt: new Date()
      };
      db.transact([
        tx.users[usr.id].update(usr)
      ])
    }

    return <HomePage user={user} />;
  }
  return <Login />;
}

function Login() {
  const [sentEmail, setSentEmail] = useState('');
  return (
    <div style={pageStyle.container}>
      {!sentEmail ? (
        <Email setSentEmail={setSentEmail} />
      ) : (
        <MagicCode sentEmail={sentEmail} />
      )}
    </div>
  );
}

function Email({ setSentEmail }) {
  const [email, setEmail] = useState('');
    const url = db.auth.createAuthorizationURL({
        clientName: "chat-app-auth",
        redirectURL: window.location.href,
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSentEmail(email);
    db.auth.sendMagicCode({ email }).catch((err) => {
      alert("Could not process login, please try other method");
      setSentEmail('');
    });
  };

  return (
    <form onSubmit={handleSubmit} style={pageStyle.form}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Get Login!</h2>
      <div>
        <input
          style={pageStyle.input}
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
        <button type="submit" style={pageStyle.button}>
          Login with OTP
        </button>
        <a href={url}>
            <button style={pageStyle.button}>
                Login with Google
            </button>
        </a>
      </div>
    </form>
  );
}

function MagicCode({ sentEmail }) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.auth.signInWithMagicCode({ email: sentEmail, code }).catch((err) => {
      alert('Passcode verification error');
      setCode('');
    });
  };

  return (
    <form onSubmit={handleSubmit} style={pageStyle.form}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>
        Please Enter code recieved on email
      </h2>
      <div>
        <input
          style={pageStyle.input}
          type="text"
          placeholder="123456..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button type="submit" style={pageStyle.button}>
        Verify
      </button>
    </form>
  );
}

export default App;