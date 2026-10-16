'use client';

import { ReactNode } from 'react';

// ── Button ──
interface ButtonProps {
  id?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export function Button({ 
  id, 
  type = 'button',
  variant = 'primary', 
  onClick, 
  disabled, 
  children,
}: ButtonProps) {
  return (
    <button
      id={id}
      type={type}
      className={`btn ${variant === 'ghost' ? 'btn-ghost' : 'btn-primary'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// ── IconButton ──
interface IconButtonProps {
  id?: string;
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function IconButton({ 
  id, 
  icon, 
  label, 
  active, 
  onClick,
}: IconButtonProps) {
  return (
    <button
      id={id}
      className={`icon-btn ${active ? 'active' : ''}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );
}

// ── Toggle ──
interface ToggleProps {
  id?: string;
  on: boolean;
  onToggle: () => void;
  label?: string;
}

export function Toggle({ id, on, onToggle, label }: ToggleProps) {
  return (
    <button
      id={id}
      className={`toggle ${on ? 'on' : ''}`}
      onClick={onToggle}
      aria-pressed={on}
      role="switch"
      aria-label={label}
    />
  );
}

// ── Card ──
interface CardProps {
  thumb: string;
  title: string;
  subtitle?: string;
  isNew?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export function Card({ 
  thumb, 
  title, 
  subtitle, 
  isNew, 
  selected, 
  onClick,
}: CardProps) {
  return (
    <div
      className={`card ${isNew ? 'card-new' : ''} ${selected ? 'card-selected' : ''}`}
      onClick={onClick}
      onKeyDown={event => { if (onClick && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); onClick(); } }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? title : undefined}
    >
      <div className="card-thumb">{thumb}</div>
      <div className="card-info">
        <div className="card-title">{title}</div>
        {subtitle && <div className="card-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
}

// ── Avatar ──
interface AvatarProps {
  name: string;
  color: string;
}

export function Avatar({ name, color }: AvatarProps) {
  return (
    <div className="avatar" style={{ background: color }}>
      {name.charAt(0)}
    </div>
  );
}

// ── Panel ──
interface PanelProps {
  className?: string;
  children: ReactNode;
}

export function Panel({ className = '', children }: PanelProps) {
  return <div className={className}>{children}</div>;
}
