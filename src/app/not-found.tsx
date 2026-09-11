export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-3 text-lg">Page not found.</p>
        <a
          href="/"
          className="mt-6 inline-block underline"
        >
          Return home
        </a>
      </div>
    </main>
  );
}
