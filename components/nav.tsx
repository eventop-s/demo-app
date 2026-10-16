'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Canvas',    href: '/canvas'    },
  { label: 'Templates', href: '/templates' },
  { label: 'New project', href: '/projects/new' },
  { label: 'Support', href: '/support' },
  { label: 'Settings', href: '/settings' },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="topnav" style={{ position: 'relative' }}>
      <span className="logo">Eventop</span>

      {/* All routes stay in the DOM and visible for zero-config page discovery. */}
      <div className="nav-tabs nav-tabs-inline">
        {tabs.map(tab => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`nav-tab ${pathname === tab.href ? 'active' : ''}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

    </nav>
  );
}
