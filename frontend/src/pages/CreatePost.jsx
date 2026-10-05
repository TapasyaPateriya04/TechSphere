import React, { useState } from 'react';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';

const CreatePost = () => {
  const [form, setForm] = useState({
    title: '',
    category: '',
    content: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post Data:', form);
  };

  return (
    <main className="page-shell create-page">
      <header className="page-heading">
        <span className="section-kicker"><Sparkles size={14} /> Share what you’re learning</span>
        <h1>Start a conversation.</h1>
        <p>Share a useful idea, a question, or something you’ve been working on.</p>
      </header>

      <form onSubmit={handleSubmit} className="content-card post-form">
        <div className="content-card-heading">
          <span className="card-icon"><FileText size={19} /></span>
          <div>
            <h2>Your post</h2>
            <p>Give your community a little context.</p>
          </div>
        </div>

        <div className="shared-form">
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="Give your post a clear title"
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Topic</label>
            <select
              id="category"
              name="category"
              required
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Choose a topic</option>
              <option value="Web Development">Web Development</option>
              <option value="AI & ML">AI &amp; ML</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="content">Your thoughts</label>
            <textarea
              id="content"
              name="content"
              required
              value={form.content}
              onChange={handleChange}
              rows="8"
              placeholder="What would you like to share with the community?"
            />
          </div>

          <div className="form-footer">
            <span>Be kind, be curious, and keep it constructive.</span>
            <button type="submit" className="button-primary">
              Publish post <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreatePost;
