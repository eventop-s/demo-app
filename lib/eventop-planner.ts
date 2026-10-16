type GraphNode = { id: string; name?: string; type: string; role?: string; pageId?: string; routeTemplate?: string };
type CompletedAction = { type: string; nodeId?: string; pageId?: string };
type Request = { userMessage: string; currentPageId?: string; graph: { revision: number; nodes: GraphNode[] }; journey?: { step: number; completed: CompletedAction[] } };
type Action = { id: string; type: string; nodeId?: string; pageId?: string; expectedEvent?: string; message?: string; timeoutMs?: number };

// A deterministic stand-in for a future backend planner. It receives only the V3
// graph, resolves semantic names at runtime, and never uses DOM selectors or IDs.
export async function planDemoRequest(request: unknown) {
  const { userMessage, currentPageId, graph, journey } = request as Request;
  const nodes = graph.nodes;
  const currentRoute = nodes.find(node => node.id === currentPageId)?.routeTemplate;
  const page = (route: string) => nodes.find(node => node.type === 'page' && node.routeTemplate === route);
  const control = (name: string) => nodes.find(node => node.type === 'control' && node.pageId === currentPageId && node.name?.toLowerCase() === name.toLowerCase());
  const surface = (name: string) => nodes.find(node => node.type === 'surface' && node.pageId === currentPageId && node.name?.toLowerCase() === name.toLowerCase());
  const completed = (node: GraphNode) => journey?.completed.some(action => action.type === 'ask-user' && action.nodeId === node.id);
  const plan = (actions: Action[]) => ({ version: '3.0' as const, goal: userMessage, graphRevision: graph.revision, actions });
  const done = (message: string) => plan([{ id: 'summary', type: 'explain', message }, { id: 'done', type: 'complete' }]);
  const go = (route: string) => {
    const target = page(route);
    return target ? plan([{ id: 'navigate', type: 'navigate', pageId: target.id }, { id: 'discover', type: 'refresh-graph', pageId: target.id }])
      : done(`I cannot see ${route} in the app's navigation yet. Open its menu or visit the page first.`);
  };
  const guide = (name: string, event: 'change' | 'click', message: string, outcomeRoute?: string) => {
    const target = control(name);
    if (!target) return done(`I cannot see the ${name} control on this page yet.`);
    const actions: Action[] = [
      { id: 'focus', type: 'focus', nodeId: target.id },
      { id: 'explain', type: 'explain', message },
      { id: 'interact', type: 'ask-user', nodeId: target.id, expectedEvent: event, timeoutMs: 120000 },
    ];
    const outcome = outcomeRoute && page(outcomeRoute);
    actions.push({ id: 'discover', type: 'refresh-graph', ...(outcome ? { pageId: outcome.id, timeoutMs: 10000 } : {}) });
    return plan(actions);
  };
  const guideSubmit = (buttonName: string, formName: string, outcomeRoute?: string) => {
    const button = control(buttonName);
    const formSurface = surface(formName);
    if (!button || !formSurface) return done(`I cannot see the ${formName} submit controls yet.`);
    const outcome = outcomeRoute && page(outcomeRoute);
    return plan([
      { id: 'focus', type: 'focus', nodeId: button.id },
      { id: 'explain', type: 'explain', message: `Review the form, then select ${buttonName}. The step advances only after a valid form submit.` },
      { id: 'submit', type: 'ask-user', nodeId: formSurface.id, expectedEvent: 'submit', timeoutMs: 120000 },
      { id: 'discover', type: 'refresh-graph', ...(outcome ? { pageId: outcome.id, timeoutMs: 10000 } : {}) },
    ]);
  };
  const form = (route: string, fields: { name: string; event: 'change' | 'click'; prompt: string }[], submit: string, formName: string, outcome?: string) => {
    if (outcome && currentRoute === outcome && (journey?.completed.filter(action => action.type === 'ask-user').length || 0) >= fields.length + 1) return done('The result page is visible. This demo did not send data to a backend.');
    if (currentRoute !== route) return go(route);
    for (const field of fields) {
      const target = control(field.name);
      if (!target) return done(`I cannot see ${field.name} on this page.`);
      if (!completed(target)) return guide(field.name, field.event, field.prompt);
    }
    const formSurface = surface(formName);
    if (!formSurface) return done(`I cannot see the ${formName} form yet.`);
    if (!completed(formSurface)) return guideSubmit(submit, formName, outcome);
    return done('The form was submitted in this demo. Check the on-page status for confirmation.');
  };

  if (/invite|teammate|member/i.test(userMessage)) return form('/dashboard', [
    { name: 'Teammate email', event: 'change', prompt: 'Enter a complete email address, then move out of the field. Eventop never reads its value.' },
  ], 'Invite', 'Invite teammate form');

  if (/support|ticket|issue|help request/i.test(userMessage)) return form('/support', [
    { name: 'Issue category', event: 'change', prompt: 'Choose the issue category.' },
    { name: 'Subject', event: 'change', prompt: 'Write the subject, then move out of the field.' },
    { name: 'Issue details', event: 'change', prompt: 'Describe the issue, then move out of the field.' },
  ], 'Submit ticket', 'Support request form', '/support/received');

  if (/settings|profile|notifications/i.test(userMessage)) return form('/settings', [
    { name: 'Display name', event: 'change', prompt: 'Enter your display name, then move out of the field.' },
    { name: 'Contact email', event: 'change', prompt: 'Enter a contact email, then move out of the field.' },
    { name: 'Email notifications', event: 'click', prompt: 'Choose whether you want email notifications.' },
  ], 'Save profile', 'Profile settings form');

  if (/create.*project|new project|make.*project/i.test(userMessage)) return form('/projects/new', [
    { name: 'Project name', event: 'change', prompt: 'Name the project, then move out of the field.' },
    { name: 'Project description', event: 'change', prompt: 'Describe the project, then move out of the field.' },
    { name: 'Project template', event: 'change', prompt: 'Choose a project template.' },
  ], 'Create project', 'New project form', '/projects/created');

  if (/template/i.test(userMessage) && /export|download/i.test(userMessage)) {
    if (currentRoute !== '/templates' && currentRoute !== '/canvas') return go('/templates');
    if (currentRoute === '/templates') {
      const apply = control('Apply template →');
      if (!apply) return guide('Social Post', 'click', 'Choose a template to continue.');
      return guide('Apply template →', 'click', 'Apply the selected template to open the canvas.', '/canvas');
    }
    const exportControl = control('Export');
    return exportControl ? plan([{ id: 'focus', type: 'focus', nodeId: exportControl.id }, { id: 'explain', type: 'explain', message: 'Export options are here; they are visual placeholders in this demo.' }, { id: 'done', type: 'complete' }]) : done('Export is not visible on this page.');
  }

  const destination = /export|download|shadow|effect|blur|canvas/i.test(userMessage) ? '/canvas' : /template/i.test(userMessage) ? '/templates' : null;
  if (destination && currentRoute !== destination) return go(destination);
  const target = nodes.find(node => node.type === 'control' && node.pageId === currentPageId && node.name?.toLowerCase().includes(userMessage.toLowerCase()));
  return target ? plan([{ id: 'focus', type: 'focus', nodeId: target.id }, { id: 'explain', type: 'explain', message: `Start here: ${target.name}.` }, { id: 'done', type: 'complete' }])
    : done('I could not identify that control yet. Try a page or task name from the navigation.');
}
