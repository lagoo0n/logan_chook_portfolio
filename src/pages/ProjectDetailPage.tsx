import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Clock, AlertTriangle, Code, Cpu } from 'lucide-react';
import { projectsData, getProjectBySlug } from '../data/projects';
import SystemDiagram from '../components/SystemDiagram';
import TerminalPreview from '../components/TerminalPreview';
import VisualPlaceholder from '../components/VisualPlaceholder';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="py-28 px-6 text-center">
        <h1 className="text-2xl font-bold text-slate-100">Project Not Found</h1>
        <p className="mt-2 text-sm text-slate-400">The requested project documentation could not be found.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to all projects</span>
        </Link>
      </div>
    );
  }

  // Find previous and next project for bottom navigation
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  return (
    <article className="min-h-screen py-12 md:py-20 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Navigation back to all projects */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to all projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <header className="border-b border-slate-800/80 pb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-3">
            <span className="text-blue-400">{project.role}</span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${project.status === 'Completed Milestone' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{project.status}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 [text-wrap:balance]">
            {project.name}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {project.tagline}
          </p>

          {/* Unboxed Technology Tags (Zero-Pill Discipline) */}
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-slate-400">Technologies:</span>
            {project.tags.map((tag, i) => (
              <span key={tag} className="flex items-center">
                <span className="text-slate-200 font-medium">{tag}</span>
                {i < project.tags.length - 1 && (
                  <span className="mx-2 text-slate-600 select-none">·</span>
                )}
              </span>
            ))}
          </div>
        </header>

        {/* 1. Problem Section */}
        <section className="py-10 border-b border-slate-800/80">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 mb-3">
            <span className="text-blue-400 font-mono text-xs">01.</span>
            Problem
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            {project.problem}
          </p>
        </section>

        {/* 2. Approach Section */}
        <section className="py-10 border-b border-slate-800/80">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 mb-3">
            <span className="text-blue-400 font-mono text-xs">02.</span>
            Approach
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            {project.approach}
          </p>
        </section>

        {/* 3. System Diagram Section */}
        <section className="py-10 border-b border-slate-800/80">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <span className="text-blue-400 font-mono text-xs">03.</span>
              System Diagram
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Architecture representation of signal stages and software-hardware boundaries.
            </p>
          </div>
          <SystemDiagram project={project} />
        </section>

        {/* 4. My Contribution Section */}
        <section className="py-10 border-b border-slate-800/80">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 mb-4">
            <span className="text-blue-400 font-mono text-xs">04.</span>
            My Contribution
          </h2>
          <ul className="space-y-3">
            {project.myContribution.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Technical Details Section */}
        <section className="py-10 border-b border-slate-800/80">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 mb-6">
            <span className="text-blue-400 font-mono text-xs">05.</span>
            Technical Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.technicalDetails.map((detail, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-[#0d121c] p-5"
              >
                <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  {detail.title}
                </h3>
                <ul className="space-y-2.5">
                  {detail.items.map((item, i) => (
                    <li key={i} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                      <span className="text-slate-400 select-none font-mono">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Results / Current Progress Section */}
        <section className="py-10 border-b border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                <span className="text-blue-400 font-mono text-xs">06.</span>
                Results &amp; Current Progress
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {project.currentProgress.statusNote}
              </p>
            </div>
          </div>

          {/* Terminal Output or Technical Visual Placeholder */}
          <div className="space-y-6">
            {project.currentProgress.hasTerminalOutput && project.currentProgress.terminalSnippet && (
              <TerminalPreview
                command={project.currentProgress.terminalSnippet.command}
                output={project.currentProgress.terminalSnippet.output}
                projectTitle={project.name}
              />
            )}

            {project.slug === 'flex-pcb' && (
              <VisualPlaceholder
                type="flex-pcb"
                title="Altium Designer Flex Stackup & Sensor Routing"
                description="Flexible polyimide circuit layout optimized for battery module packaging with radiused traces and FR4 stiffeners."
              />
            )}

            {project.slug === 'robotics' && (
              <VisualPlaceholder
                type="robotics"
                title="ROS 2 & MoveIt Simulation Environment"
                description="Manipulator planning scene configured in RViz with collision boundaries and joint velocity limit parameterization."
              />
            )}

            {project.slug === 'imu-firmware' && (
              <VisualPlaceholder
                type="imu"
                title="Hardware Interrupt & Timing Profiling"
                description="Oscilloscope and logic analyzer timing verification placeholder for IMU DRDY interrupt to I2C transfer latency."
              />
            )}

            {/* Milestones status table */}
            <div className="rounded-xl border border-slate-800 bg-[#0d121c] p-5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Milestone Status &amp; Roadmap
              </h3>
              <div className="divide-y divide-slate-800/80">
                {project.currentProgress.milestones.map((ms, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2.5">
                      {ms.status === 'Completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : ms.status === 'In Progress' ? (
                        <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                      ) : (
                        <span className="h-3 w-3 rounded-full border border-slate-600 shrink-0 ml-0.5" />
                      )}
                      <span className="font-medium text-slate-200">{ms.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <span>{ms.notes}</span>
                      <span className={`font-mono text-[11px] px-2 py-0.5 rounded text-right whitespace-nowrap ${
                        ms.status === 'Completed' ? 'text-emerald-400' : ms.status === 'In Progress' ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {ms.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Next Steps (Especially for QEMU) */}
        {project.nextSteps && (
          <section className="py-10 border-b border-slate-800/80">
            <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 mb-4">
              <span className="text-blue-400 font-mono text-xs">07.</span>
              Next Steps
            </h2>
            <ul className="space-y-3">
              {project.nextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                  <span className="text-blue-400 font-mono text-xs mt-0.5">›</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 8. What I Learned Section */}
        <section className="py-10 border-b border-slate-800/80">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 mb-4">
            <span className="text-blue-400 font-mono text-xs">{project.nextSteps ? '08.' : '07.'}</span>
            What I Learned
          </h2>
          <div className="space-y-3">
            {project.whatILearned.map((note, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-800/90 bg-[#0d121c] p-4 text-sm text-slate-300 leading-relaxed"
              >
                {note}
              </div>
            ))}
          </div>
        </section>

        {/* Other Projects Navigation */}
        <section className="py-12">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-6">
            Explore Other Projects
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0d131f] p-5 hover:border-slate-700 hover:bg-[#0f1626] transition-all"
              >
                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-2">
                  <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Previous Project</span>
                </div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">
                  {prevProject.name}
                </div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {prevProject.tagline}
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0d131f] p-5 text-right hover:border-slate-700 hover:bg-[#0f1626] transition-all"
              >
                <div className="text-xs font-mono text-slate-400 flex items-center justify-end gap-1.5 mb-2">
                  <span>Next Project</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">
                  {nextProject.name}
                </div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {nextProject.tagline}
                </div>
              </Link>
            ) : (
              <Link
                to="/"
                className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0d131f] p-5 text-right hover:border-slate-700 hover:bg-[#0f1626] transition-all"
              >
                <div className="text-xs font-mono text-slate-400 flex items-center justify-end gap-1.5 mb-2">
                  <span>Overview</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">
                  Back to Portfolio Home
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  View all 4 engineering projects
                </div>
              </Link>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
