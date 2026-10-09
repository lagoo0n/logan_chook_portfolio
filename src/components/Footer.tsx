import { Mail, Linkedin, Github, FileText, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-800 bg-[#090d15] py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-md">
            <h2 className="text-xl font-semibold text-slate-100 tracking-tight">
              Get in Touch
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Interested in discussing embedded systems, firmware emulation, robotics, or hardware-software engineering internship opportunities? Feel free to reach out directly.
            </p>
            <div className="mt-5">
              <a
                href="mailto:loganchook@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <Mail className="h-4 w-4" />
                <span>loganchook@gmail.com</span>
                <span className="text-xs text-slate-400 group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Navigation
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li>
                  <a href="/" className="hover:text-slate-200 transition-colors">Home</a>
                </li>
                <li>
                  <a href="/#projects" className="hover:text-slate-200 transition-colors">Projects</a>
                </li>
                <li>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors inline-flex items-center gap-1">
                    Resume <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Connect
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="https://www.linkedin.com/in/loganchook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-slate-200 transition-colors"
                  >
                    <Linkedin className="h-3.5 w-3.5 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/loganchook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-slate-200 transition-colors"
                  >
                    <Github className="h-3.5 w-3.5 text-slate-400" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-slate-200 transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                    <span>Resume (PDF)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Logan Chook · Electrical Engineering Portfolio</p>
          <p className="font-mono text-slate-400">Embedded Systems · Firmware · Hardware</p>
        </div>
      </div>
    </footer>
  );
}
