import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, FileText, Linkedin, Github, Cpu, Radio, Layers, Bot, Mail, CheckCircle2 } from 'lucide-react';
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

          {/* 30-Second Recruiter Summary Strip */}
          <div className="mt-14 pt-8 border-t border-slate-800/80">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
              Core Technical Focus
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg border border-slate-800/90 bg-[#0d121c] p-3.5">
                <div className="text-xs font-semibold text-slate-200">Firmware & RTOS</div>
                <div className="text-xs text-slate-400 mt-1">C/C++, ESP-IDF, FreeRTOS, non-blocking drivers</div>
              </div>
              <div className="rounded-lg border border-slate-800/90 bg-[#0d121c] p-3.5">
                <div className="text-xs font-semibold text-slate-200">Virtual Emulation</div>
                <div className="text-xs text-slate-400 mt-1">QEMU, mocked peripherals, fault injection</div>
              </div>
              <div className="rounded-lg border border-slate-800/90 bg-[#0d121c] p-3.5">
                <div className="text-xs font-semibold text-slate-200">Robotics Control</div>
                <div className="text-xs text-slate-400 mt-1">ROS 2, MoveIt kinematics, RViz simulation</div>
              </div>
              <div className="rounded-lg border border-slate-800/90 bg-[#0d121c] p-3.5">
                <div className="text-xs font-semibold text-slate-200">Hardware & PCB</div>
                <div className="text-xs text-slate-400 mt-1">Altium Designer, flex PCB stackups, sensors</div>
              </div>
            </div>
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

      {/* Engineering Principles / Approach Highlights */}
      <section className="relative py-16 px-6 border-t border-slate-800/80 bg-[#090d15]/50">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-100">
              Engineering Approach & Principles
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              How I approach building reliable embedded systems and integrating software with physical hardware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-800/90 bg-[#0d121c] p-5">
              <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-mono uppercase">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Deterministic Firmware</span>
              </div>
              <h4 className="text-sm font-medium text-slate-200">Zero-Heap & Static Allocation</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Prioritizing compile-time memory bounds, ring buffers, and fast non-blocking interrupt routines over fragile dynamic allocations.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800/90 bg-[#0d121c] p-5">
              <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-mono uppercase">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Shift-Left Testing</span>
              </div>
              <h4 className="text-sm font-medium text-slate-200">Host Emulation Before Hardware</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Simulating peripheral registers and bus protocols in QEMU to catch edge-case logic faults before flashing physical hardware.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800/90 bg-[#0d121c] p-5">
              <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-mono uppercase">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Clean Abstraction</span>
              </div>
              <h4 className="text-sm font-medium text-slate-200">Driver & Hardware Decoupling</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Structuring clean hardware abstraction layers (HAL) so sensor state and communications can be transparently injected or tested.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section at bottom */}
      <section className="relative py-20 px-6 border-t border-slate-800">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-800 bg-[#0d131f] p-8 md:p-12 relative overflow-hidden">
            {/* Subtle glow backdrop */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
                Internship & Engineering Opportunities
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
                Let&apos;s Build Together
              </h2>
              <p className="mt-3 text-sm md:text-base text-slate-300 leading-relaxed">
                I am actively seeking engineering internships in embedded systems, firmware development, robotics, and hardware-software integration.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:loganchook@gmail.com"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors shadow-sm"
                >
                  <Mail className="h-4 w-4" />
                  <span>loganchook@gmail.com</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/loganchook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-white hover:border-slate-600 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-blue-400" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                </a>

                <a
                  href="https://github.com/loganchook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-white hover:border-slate-600 transition-colors"
                >
                  <Github className="h-4 w-4 text-slate-300" />
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
