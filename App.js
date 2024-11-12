import React, { useState } from 'react';

const App = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const checkPasswordStrength = (pwd) => {
    const strengthLevels = [
      { regex: /.{8,}/, points: 1 },
      { regex: /[A-Z]/, points: 1 },
      { regex: /[a-z]/, points: 1 },
      { regex: /[0-9]/, points: 1 },
      { regex: /[^A-Za-z0-9]/, points: 1 },
    ];
    const score = strengthLevels.reduce((acc, level) => acc + level.regex.test(pwd), 0);
    const levels = ['Weak', 'Medium', 'Strong', 'Very Strong'];
    setStrength(levels[Math.min(score - 1, levels.length - 1)] || 'Weak');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Password Strength Checker</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          checkPasswordStrength(e.target.value);
        }}
        placeholder="Enter your password"
        style={{ padding: '10px', fontSize: '16px', width: '100%' }}
      />
      <div style={{ marginTop: '10px', fontSize: '18px' }}>
        <strong>Password Strength: </strong>{strength}
      </div>
    </div>
  );
};

export default App;
