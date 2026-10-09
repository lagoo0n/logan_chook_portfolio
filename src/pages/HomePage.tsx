import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, FileText, Linkedin, Github, Cpu, Radio, Layers, Bot } from 'lucide-react';
import { projectsData } from '../data/projects';

export default function HomePage() {
  const getProjectIcon = (slug: string) => {
    switch (slug) {
      case 'qemu-emulation':
        return <Cpu className="h-5 w-5 text-blue-400" />;
      case 'robotic-arm':
        return <Bot className="h-5 w-5 text-blue-400" />;
      case 'imu-firmware':
        return <Radio className="h-5 w-5 text-blue-400" />;
      case 'flex-pcb':
        return <Layers className="h-5 w-5 text-blue-400" />;
      default:
        return <Cpu className="h-5 w-5 text-blue-400" />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Circuit Grid Texture */}
      <div className="absolute inset-0 bg-circuit-grid pointer-events-none opacity-60" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-6 border-b border-slate-800/80">
        <div className="mx-auto max-w-5xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            <span>Electrical Engineering Portfolio</span>
          </div>

          {/* Main Hero Header */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 max-w-4xl [text-wrap:balance]">
            Logan Chook — Electrical Engineering Student
          </h1>

          {/* Focus Subtitle */}
          <p className="mt-4 text-lg md:text-xl font-medium text-blue-300/90 tracking-tight">
            Embedded Systems · Robotics · Hardware-Software Integration
          </p>

          {/* Value proposition line */}
          <p className="mt-4 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            I build and test systems where firmware, electronics, and software meet.
          </p>

          {/* Action CTAs: Resume, LinkedIn, GitHub */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span>Resume</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
            </a>

            <a
              href="https://www.linkedin.com/in/loganchook"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Linkedin className="h-4 w-4 text-blue-400" />
              <span>LinkedIn</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
            </a>

            <a
              href="https://github.com/loganchook"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Github className="h-4 w-4 text-slate-300" />
              <span>GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
            </a>
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1.5">
                Featured Work
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
                Engineering Projects
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Each project explores practical challenges across embedded firmware, virtual test harnesses, robotics, and hardware design.
            </p>
          </div>

          {/* 4 Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project) => (
              <article
                key={project.slug}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0d131f] p-6 lg:p-7 hover:border-slate-700 hover:bg-[#0f1626] transition-all duration-200"
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/80 group-hover:border-blue-500/30 group-hover:bg-blue-950/20 transition-colors">
                      {getProjectIcon(project.slug)}
                    </div>
                    {/* Status note */}
                    <span className="text-[11px] font-mono text-slate-400">
                      {project.status}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">
                    {project.name}
                  </h3>

                  {/* One-line Description */}
                  <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Unboxed Technology Tags (Zero-Pill Discipline) */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-400 font-mono">
                    {project.tags.map((tag, i) => (
                      <span key={tag} className="flex items-center">
                        <span className="text-slate-300">{tag}</span>
                        {i < project.tags.length - 1 && (
                          <span className="mx-1.5 text-slate-600 select-none">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Project Action Link */}
                <div className="mt-6 pt-5 border-t border-slate-800/80">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-0.5 transform duration-150"
                  >
                    <span>View project</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
