'use client';

import { useState } from 'react';
import { Button, Avatar } from '../ui';

const members = [
  { id: '1', name: 'Alice', role: 'Owner',  color: '#6366f1' },
  { id: '2', name: 'Bob',   role: 'Editor', color: '#10b981' },
  { id: '3', name: 'Clara', role: 'Viewer', color: '#f59e0b' },
] as const;

export function TeamSection() {
  const [email,    setEmail]    = useState('');
  const [inviting, setInviting] = useState(false);
  const [sent, setSent] = useState(false);

  const validateEmail = (email: string): boolean => {
    return email.includes('@') && email.includes('.');
  };

  const handleInvite = async () => {
    if (!validateEmail(email)) {
      return;
    }

    setInviting(true);
    setSent(false);
    await new Promise(resolve => setTimeout(resolve, 900));
    setInviting(false);
    setEmail('');
    setSent(true);
  };

  return (
    <>
      <h2 className="section-title">Team</h2>
      <div className="team-row">
        {members.map(m => (
          <div key={m.id} className="member-card">
            <Avatar name={m.name} color={m.color} />
            <div>
              <div className="member-name">{m.name}</div>
              <div className="member-role">{m.role}</div>
            </div>
          </div>
        ))}

          <form className="invite-card" id="invite-form" aria-label="Invite teammate form" onSubmit={event => { event.preventDefault(); void handleInvite(); }}>
            <input
              type="email"
              required
              aria-label="Teammate email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="text-input"
              disabled={inviting}
            />
            <Button
              type="submit"
              disabled={inviting || !validateEmail(email)}
              id="btn-send-invite"
            >
              {inviting ? 'Sending…' : 'Invite'}
            </Button>
          </form>
          {sent && <p role="status" className="form-status">Invitation queued in this demo.</p>}
      </div>
    </>
  );
}
