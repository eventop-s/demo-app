'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [saved, setSaved] = useState(false);
  return <div className="workflow-page">
    <h1>Profile settings</h1>
    <p className="workflow-intro">Test email guidance, a checkbox, validation, and an in-place success state.</p>
    <form className="workflow-form" aria-label="Profile settings form" onSubmit={event => { event.preventDefault(); setSaved(true); }}>
      <label htmlFor="profile-name">Display name
        <input id="profile-name" className="text-input" value={name} onChange={event => { setName(event.target.value); setSaved(false); }} required minLength={2} placeholder="Your name" />
      </label>
      <label htmlFor="profile-email">Contact email
        <input id="profile-email" className="text-input" type="email" value={email} onChange={event => { setEmail(event.target.value); setSaved(false); }} required placeholder="you@example.com" />
      </label>
      <label className="check-label" htmlFor="profile-notifications">
        <input id="profile-notifications" type="checkbox" checked={notifications} onChange={event => { setNotifications(event.target.checked); setSaved(false); }} />
        Email notifications
      </label>
      <button className="btn btn-primary" type="submit">Save profile</button>
      {saved && <p role="status" className="form-status">Profile saved in this demo.</p>}
    </form>
  </div>;
}
