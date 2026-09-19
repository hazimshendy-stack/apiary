import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container notfound">
      <div className="notfound__code">404</div>
      <h2 className="mt-4">This cell of the hive is empty</h2>
      <p className="muted mt-3">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn--primary mt-6">
        Back to the hive
      </Link>
    </div>
  );
}
