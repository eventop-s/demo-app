'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [template, setTemplate] = useState('');
  return <div className="workflow-page">
    <h1>New project</h1>
    <p className="workflow-intro">Complete three fields, create the project, then continue to its result page. This is local demo data.</p>
    <form className="workflow-form" aria-label="New project form" onSubmit={event => { event.preventDefault(); router.push('/projects/created'); }}>
      <label htmlFor="project-name">Project name
        <input id="project-name" className="text-input" value={name} onChange={event => setName(event.target.value)} required minLength={3} placeholder="Autumn campaign" />
      </label>
      <label htmlFor="project-description">Project description
        <textarea id="project-description" className="text-input" value={description} onChange={event => setDescription(event.target.value)} required minLength={8} placeholder="What will this project be used for?" />
      </label>
      <label htmlFor="project-template">Project template
        <select id="project-template" className="text-input" value={template} onChange={event => setTemplate(event.target.value)} required>
          <option value="">Choose a template</option>
          <option value="blank">Blank canvas</option>
          <option value="social">Social post</option>
          <option value="presentation">Presentation</option>
        </select>
      </label>
      <button className="btn btn-primary" type="submit">Create project</button>
    </form>
    <Link className="workflow-link" href="/projects/created">Preview the project outcome</Link>
  </div>;
}
