import Link from 'next/link';

export default function SupportReceivedPage() {
  return <div className="workflow-page">
    <h1>Ticket received</h1>
    <p className="workflow-intro" role="status">The demo support request reached its receipt screen. No ticket was sent to a server.</p>
    <Link className="workflow-link" href="/dashboard">Return to dashboard</Link>
  </div>;
}
