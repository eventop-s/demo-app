import Link from 'next/link';

export default function ProjectCreatedPage() {
  return <div className="workflow-page">
    <h1>Project created</h1>
    <p className="workflow-intro" role="status">Your demo project is ready. No backend record was created.</p>
    <Link className="workflow-link" href="/canvas">Open canvas</Link>
  </div>;
}
