import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Visual 404 Header */}
        <div className="relative">
          <h1 className="text-9xl font-extrabold tracking-widest text-slate-800 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent text-2xl sm:text-3xl font-bold">
              Page Not Found
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <p className="text-slate-400 text-lg">
            Oops! The page you are looking for seems to have wandered off into the digital void.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-lg shadow-indigo-500/25 text-center"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium transition-colors text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}