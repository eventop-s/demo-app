'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SupportPage() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  return <div className="workflow-page">
    <h1>Contact support</h1>
    <p className="workflow-intro">A second form with different field order and a separate receipt endpoint. Submissions remain in the browser demo.</p>
    <form className="workflow-form" aria-label="Support request form" onSubmit={event => { event.preventDefault(); router.push('/support/received'); }}>
      <label htmlFor="support-category">Issue category
        <select id="support-category" className="text-input" value={category} onChange={event => setCategory(event.target.value)} required>
          <option value="">Select a category</option>
          <option value="access">Account access</option>
          <option value="exports">Exports</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label htmlFor="support-subject">Subject
        <input id="support-subject" className="text-input" value={subject} onChange={event => setSubject(event.target.value)} required minLength={4} placeholder="Brief summary" />
      </label>
      <label htmlFor="support-details">Issue details
        <textarea id="support-details" className="text-input" value={details} onChange={event => setDetails(event.target.value)} required minLength={10} placeholder="Tell us what happened" />
      </label>
      <button className="btn btn-primary" type="submit">Submit ticket</button>
    </form>
    <Link className="workflow-link" href="/support/received">Preview the support receipt</Link>
  </div>;
}
