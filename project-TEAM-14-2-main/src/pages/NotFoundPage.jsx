import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="text-center py-5">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="fs-3">Page not found.</p>
      <p className="lead">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-purple">Go Home</Link>
    </div>
  );
}