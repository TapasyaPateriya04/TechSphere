import React, { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', form);
  };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <div className="auth-mark"><Sparkles size={17} /></div>
        <span className="section-kicker">Your community is waiting</span>
        <h1 id="login-title">Welcome back</h1>
        <p className="auth-description">Pick up where you left off and keep building alongside your people.</p>

        <form onSubmit={handleSubmit} className="shared-form">
          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <div className="input-wrap">
              <Mail size={17} aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <LockKeyhole size={17} aria-hidden="true" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button type="submit" className="button-primary form-submit">
            Log in <ArrowRight size={17} />
          </button>
        </form>

        <p className="auth-switch">
          New to TechSphere? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
