import React, { createElement } from 'react'
import { ArrowDownRight, ArrowRight, Bot, Code2, Compass, Cpu, Lightbulb, MessageCircle, Plus, Sparkles, Users, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'

const paths = [
  {
    icon: Code2,
    number: '01',
    title: 'Share what you know',
    description: 'Turn a useful fix, a new idea, or a hard-won lesson into someone else’s starting point.',
    link: 'Create a post',
    to: '/create',
    tone: 'lavender',
  },
  {
    icon: MessageCircle,
    number: '02',
    title: 'Find your collaborators',
    description: 'Meet people who are curious about the same things and make progress side by side.',
    link: 'Explore groups',
    to: '/groups',
    tone: 'mint',
  },
  {
    icon: Lightbulb,
    number: '03',
    title: 'Keep learning in public',
    description: 'Ask better questions, get thoughtful feedback, and make your next project stronger.',
    link: 'Join the conversation',
    to: '/register',
    tone: 'peach',
  },
]

const interests = ['AI & machine learning', 'Web development', 'Open source', 'Product design']

const Home = () => {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-main">
          <div className="hero-copy">
            <span className="eyebrow-chip"><Sparkles size={14} /> The student builder community</span>
            <h1>
              Your next big idea
              <span> needs a bigger circle.</span>
            </h1>
            <p className="hero-description">
              A place for curious students to share what they’re making, find their people, and figure things out together.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="button-primary">Find your people <ArrowRight size={17} /></Link>
              <Link to="/groups" className="button-secondary"><Compass size={16} /> Explore communities</Link>
            </div>
            <div className="hero-note">
              <span className="note-avatars" aria-hidden="true"><i>T</i><i>S</i><i>+</i></span>
              <span>A little corner of campus for what’s next.</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Technology ideas grow when shared">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-sticker sticker-top"><Cpu size={17} /> CURIOUS BY DESIGN</div>
            <div className="art-sticker sticker-bottom"><span className="live-dot" /> OPEN TO IDEAS</div>
            <div className="art-core">
              <div className="core-icon"><Wrench size={28} /></div>
              <span>make it</span>
              <strong>together<span>.</span></strong>
            </div>
            <div className="orbit-node node-code"><Code2 size={19} /></div>
            <div className="orbit-node node-bot"><Bot size={19} /></div>
            <div className="orbit-node node-users"><Users size={19} /></div>
            <div className="art-caption"><span>IDEAS IN PROGRESS</span><ArrowDownRight size={17} /></div>
          </div>
        </div>

        <div className="interest-strip">
          <span className="interest-label">Find your kind of curious</span>
          <div className="interest-list">
            {interests.map((interest) => <span className="interest-pill" key={interest}>{interest}</span>)}
          </div>
          <Link to="/groups" className="interest-link" aria-label="Explore all communities"><ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="home-paths">
        <div className="section-intro">
          <span className="section-kicker">A community that moves with you</span>
          <h2>Make room for <span>what you’re becoming.</span></h2>
          <p>From your first question to your next big launch, there’s a place for every step of the build.</p>
        </div>
        <div className="path-grid">
          {paths.map(({ icon, number, title, description, link, to, tone }) => (
            <article className={`path-card ${tone}`} key={number}>
              <div className="path-card-top"><span>{number}</span>{createElement(icon, { size: 21 })}</div>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link to={to}>{link}<ArrowRight size={15} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div className="cta-spark"><Sparkles size={19} /></div>
        <div>
          <span className="section-kicker">Your people are out there</span>
          <h2>Let’s see what you make together.</h2>
          <p>Bring your questions, half-finished ideas, and big plans.</p>
        </div>
        <Link to="/register" className="button-primary">Join TechSphere <Plus size={17} /></Link>
      </section>
      <footer className="home-footer"><Link to="/" className="footer-wordmark">TechSphere<span>.</span></Link><span>Built for the curious, by the curious.</span><Link to="/groups">Find your community <ArrowRight size={14} /></Link></footer>
    </main>
  )
}

export default Home
