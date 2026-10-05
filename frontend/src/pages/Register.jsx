import React, { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail, Sparkles, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Registering:', form);
  };

  return (
    <main className="auth-page">
      <section className="auth-card register-card" aria-labelledby="register-title">
        <div className="auth-mark"><Sparkles size={17} /></div>
        <span className="section-kicker">Make something together</span>
        <h1 id="register-title">Find your people.</h1>
        <p className="auth-description">Join a community of curious students sharing ideas, learning, and making things happen.</p>

        <form onSubmit={handleSubmit} className="shared-form">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <div className="input-wrap">
              <UserRound size={17} aria-hidden="true" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
          </div>

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
                autoComplete="new-password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <div className="input-wrap">
              <LockKeyhole size={17} aria-hidden="true" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your password again"
              />
            </div>
          </div>

          <button type="submit" className="button-primary form-submit">
            Create account <ArrowRight size={17} />
          </button>
        </form>

        <p className="auth-switch">
          Already a member? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
