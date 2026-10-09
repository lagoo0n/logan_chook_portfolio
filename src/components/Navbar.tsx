import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Mail } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand title, single line */}
        <Link 
          to="/" 
          className="text-base font-semibold tracking-tight text-slate-100 hover:text-white whitespace-nowrap shrink-0 transition-colors"
        >
          Logan Chook
        </Link>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link 
            to="/" 
            className={`transition-colors hover:text-blue-400 whitespace-nowrap shrink-0 ${isHome ? 'text-white' : 'text-slate-300'}`}
          >
            Home
          </Link>
          <a 
            href="/#projects" 
            onClick={handleProjectsClick}
            className="text-slate-300 hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
          >
            Projects
          </a>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1 text-slate-300 hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
          >
            Resume
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
          </a>
          <a 
            href="https://www.linkedin.com/in/loganchook" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1 text-slate-300 hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
          >
            LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
          </a>
          <a 
            href="https://github.com/loganchook" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1 text-slate-300 hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
          >
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="mailto:loganchook@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600/15 border border-blue-500/30 px-3.5 py-1.5 text-xs font-medium text-blue-300 hover:bg-blue-600/25 hover:border-blue-400/50 hover:text-white transition-all whitespace-nowrap shrink-0"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0d131f] px-6 py-5">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-blue-400 transition-colors py-1"
            >
              Home
            </Link>
            <a
              href="/#projects"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleProjectsClick(e);
              }}
              className="text-slate-200 hover:text-blue-400 transition-colors py-1"
            >
              Projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-between text-slate-200 hover:text-blue-400 transition-colors py-1"
            >
              <span>Resume</span>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/loganchook"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-between text-slate-200 hover:text-blue-400 transition-colors py-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </a>
            <a
              href="https://github.com/loganchook"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-between text-slate-200 hover:text-blue-400 transition-colors py-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </a>
            <div className="pt-2 border-t border-slate-800">
              <a
                href="mailto:loganchook@gmail.com"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600/20 border border-blue-500/40 py-2.5 text-xs font-medium text-blue-200 hover:bg-blue-600/30"
              >
                <Mail className="h-4 w-4" />
                <span>Email Logan Chook</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
