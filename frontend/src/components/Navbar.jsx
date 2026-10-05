import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'

const navigation = [
  { path: '/', label: 'Home' },
  { path: '/create', label: 'Create post' },
  { path: '/groups', label: 'Communities' },
  { path: '/chat', label: 'Messages' },
]

const Navbar = () => {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    const closeMenu = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeMenu)
    return () => window.removeEventListener('keydown', closeMenu)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/" className="brand-lockup" onClick={closeMenu} aria-label="TechSphere home">
          <span className="brand-symbol">T</span>
          <span>TechSphere<span className="brand-period">.</span></span>
        </Link>

        <div className={`nav-center ${menuOpen ? 'is-open' : ''}`}>
          <div className="nav-links">
            {navigation.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                onClick={closeMenu}
                className={({ isActive }) => `site-nav-link ${isActive ? 'active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="mobile-nav-actions">
            <Link to="/login" className="nav-login" onClick={closeMenu}>Log in</Link>
            <Link to="/register" className="nav-join" onClick={closeMenu}>Join the community <ArrowUpRight size={15} /></Link>
          </div>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="nav-login desktop-nav-action">Log in</Link>
          <Link to="/register" className="nav-join desktop-nav-action">Join TechSphere <ArrowUpRight size={15} /></Link>
          <button
            onClick={() => setIsDark((current) => !current)}
            className="theme-toggle"
            type="button"
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
