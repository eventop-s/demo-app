import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../lib/eventop-planner.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { planDemoRequest } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);

const page = (route, id) => ({ id, type: 'page', name: route, routeTemplate: route });
const control = (name, id, pageId) => ({ id, type: 'control', name, pageId });
const surface = (name, id, pageId) => ({ id, type: 'surface', name, pageId });
const pages = [page('/dashboard', 'p-dashboard'), page('/projects/new', 'p-new'), page('/projects/created', 'p-created'), page('/support', 'p-support'), page('/support/received', 'p-received'), page('/settings', 'p-settings')];
const controls = [
  control('Teammate email', 'c-invite-email', 'p-dashboard'), control('Invite', 'c-invite', 'p-dashboard'),
  control('Project name', 'c-project-name', 'p-new'), control('Project description', 'c-project-description', 'p-new'), control('Project template', 'c-project-template', 'p-new'), control('Create project', 'c-create', 'p-new'),
  control('Issue category', 'c-category', 'p-support'), control('Subject', 'c-subject', 'p-support'), control('Issue details', 'c-details', 'p-support'), control('Submit ticket', 'c-submit', 'p-support'),
  control('Display name', 'c-display', 'p-settings'), control('Contact email', 'c-contact', 'p-settings'), control('Email notifications', 'c-notifications', 'p-settings'), control('Save profile', 'c-save', 'p-settings'),
];
const surfaces = [surface('Invite teammate form', 's-invite', 'p-dashboard'), surface('New project form', 's-project', 'p-new'), surface('Support request form', 's-support', 'p-support'), surface('Profile settings form', 's-settings', 'p-settings')];
const request = (message, currentPageId, completed = []) => ({ version: '3.0', userMessage: message, currentPageId, graph: { revision: 1, nodes: [...pages, ...controls, ...surfaces] }, journey: { step: completed.length, completed } });
const acted = nodeId => ({ type: 'ask-user', nodeId });
const action = plan => plan.actions.find(item => item.type === 'ask-user' || item.type === 'navigate' || item.type === 'complete');

test('project creation resolves unvisited page, each form field, and receipt route from graph metadata', async () => {
  assert.deepEqual(action(await planDemoRequest(request('Create a new project', 'p-dashboard'))), { id: 'navigate', type: 'navigate', pageId: 'p-new' });
  const stages = [
    [[], 'c-project-name', 'change'],
    [[acted('c-project-name')], 'c-project-description', 'change'],
    [[acted('c-project-name'), acted('c-project-description')], 'c-project-template', 'change'],
    [[acted('c-project-name'), acted('c-project-description'), acted('c-project-template')], 's-project', 'submit'],
  ];
  for (const [completed, nodeId, expectedEvent] of stages) {
    const plan = await planDemoRequest(request('Create a new project', 'p-new', completed));
    assert.equal(action(plan).nodeId, nodeId);
    assert.equal(action(plan).expectedEvent, expectedEvent);
    if (nodeId === 's-project') assert.equal(plan.actions.at(-1).pageId, 'p-created');
  }
  assert.equal(action(await planDemoRequest(request('Create a new project', 'p-created', stages.at(-1)[0].concat(acted('s-project'))))).type, 'complete');
});

test('support, settings, and invitation use different field and endpoint sequences', async () => {
  assert.equal(action(await planDemoRequest(request('Submit a support ticket', 'p-dashboard'))).pageId, 'p-support');
  assert.equal(action(await planDemoRequest(request('Submit a support ticket', 'p-support'))).nodeId, 'c-category');
  assert.equal(action(await planDemoRequest(request('Submit a support ticket', 'p-support', [acted('c-category')]))).nodeId, 'c-subject');
  const supportSubmit = await planDemoRequest(request('Submit a support ticket', 'p-support', [acted('c-category'), acted('c-subject'), acted('c-details')]));
  assert.equal(action(supportSubmit).nodeId, 's-support');
  assert.equal(supportSubmit.actions.at(-1).pageId, 'p-received');
  assert.equal(action(await planDemoRequest(request('Update my profile settings', 'p-settings', [acted('c-display'), acted('c-contact')]))).nodeId, 'c-notifications');
  assert.equal(action(await planDemoRequest(request('Invite a teammate', 'p-dashboard'))).nodeId, 'c-invite-email');
  assert.equal(action(await planDemoRequest(request('Invite a teammate', 'p-dashboard', [acted('c-invite-email')]))).nodeId, 's-invite');
});

test('unregistered destinations and missing controls fail with guidance, not invented graph IDs', async () => {
  const noSupportPage = request('Submit a support ticket', 'p-dashboard');
  noSupportPage.graph.nodes = noSupportPage.graph.nodes.filter(node => node.id !== 'p-support');
  const plan = await planDemoRequest(noSupportPage);
  assert.equal(plan.actions.some(item => item.type === 'navigate'), false);
  assert.equal(plan.actions.some(item => item.type === 'explain'), true);
});
