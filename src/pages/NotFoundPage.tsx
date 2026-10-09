import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
        Error 404
      </div>
      <h1 className="text-3xl font-bold text-slate-100">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm text-slate-400 max-w-md">
        The requested URL does not match any route in this engineering portfolio.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}
