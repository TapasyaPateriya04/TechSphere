import React from 'react';
import { ArrowRight, Bot, Code2, LockKeyhole, Server, UsersRound } from 'lucide-react';

const groups = [
  {
    name: 'Frontend Developers',
    description: 'Discuss React, Vue, Angular and the tools shaping great web experiences.',
    category: 'WEB DEVELOPMENT',
    icon: Code2,
    tone: 'lavender',
    members: 'Build interfaces together',
  },
  {
    name: 'Backend Engineers',
    description: 'Share insights on Node.js, Python, databases, APIs and reliable systems.',
    category: 'BACKEND & SYSTEMS',
    icon: Server,
    tone: 'mint',
    members: 'Design what powers the web',
  },
  {
    name: 'AI & Machine Learning',
    description: 'Explore models, datasets, experiments and practical machine learning.',
    category: 'AI & DATA',
    icon: Bot,
    tone: 'peach',
    members: 'Turn ideas into intelligence',
  },
  {
    name: 'Cybersecurity Enthusiasts',
    description: 'Talk about network security, tools, and responsible best practices.',
    category: 'SECURITY',
    icon: LockKeyhole,
    tone: 'blue',
    members: 'Learn to build more safely',
  },
];

const Groups = () => {
  return (
    <main className="page-shell groups-page">
      <header className="page-heading">
        <span className="section-kicker"><UsersRound size={14} /> Find your kind of curious</span>
        <h1>Good things grow <span>in good company.</span></h1>
        <p>Find a space to ask questions, share what you know, and build alongside other students.</p>
      </header>

      <div className="group-grid">
        {groups.map((group) => {
          const GroupIcon = group.icon;
          return (
            <article className={`group-card ${group.tone}`} key={group.name}>
              <div className="group-card-top">
                <span className="card-icon"><GroupIcon size={20} /></span>
                <span className="group-category">{group.category}</span>
              </div>
              <h2>{group.name}</h2>
              <p>{group.description}</p>
              <div className="group-card-footer">
                <span><UsersRound size={15} /> {group.members}</span>
                <button type="button" className="text-action" aria-label={`Join ${group.name}`}>
                  Join <ArrowRight size={16} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};

export default Groups;
