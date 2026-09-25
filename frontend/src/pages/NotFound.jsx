import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="container-page flex min-h-[75vh] flex-col items-center justify-center text-center">
      <p className="font-display text-8xl font-semibold text-forest/15">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-forest-dark">This plate's empty</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/60">
        We couldn't find the page you're looking for. It may have been moved, or the link might be off.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </section>
  );
}

export default NotFound;
