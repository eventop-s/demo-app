import { StatsRow }    from '../../components/dashboard/stats-row';
import { ProjectGrid } from '../../components/dashboard/project-grid';
import { TeamSection } from '../../components/dashboard/team-section';

export default function DashboardPage() {
  return (
    <div className="dashboard-body">
      <h1 className="section-title">Dashboard</h1>
      <StatsRow />
      <ProjectGrid />
      <TeamSection />
    </div>
  );
}
