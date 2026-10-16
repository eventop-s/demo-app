# Eventop V3 demo pilot

This Next.js app runs against the local, unpublished V3 SDK at `../sdk/packages/sdk`. It deliberately uses no page manifest, per-control Eventop keys, or manual route refresh. The old V1 tour wrappers have been removed.

## Run locally

```bash
cd ../sdk
pnpm build
cd ../demo-app
pnpm install
pnpm dev
```

Open `http://localhost:3000`. The app redirects to `/dashboard`; open the Eventop launcher and try “Invite a teammate”, “Create a new project”, “Submit a support ticket”, “Update my profile settings”, or “Apply a template then export”. The project and support tasks cross form fields and end on separate result pages. Settings tests an in-place save state; invite tests a disabled button and email field. The local deterministic planner in `lib/eventop-planner.ts` returns V3 graph-ID plans. It does not call a model or require an API key. The existing `/api/guide` endpoint is legacy code and is not used by this pilot.

The SDK is linked directly, so rebuild the SDK after changing it and restart the demo app. This local link is for development only; replace it with a published package version before deploying the demo.

## Integration notes

- `components/eventop-provider.tsx` initializes one V3 client and supplies the local planner plus a Next navigation function. There are no route registrations or per-component SDK calls.
- Visible same-origin links provide unvisited-page metadata. Ordinary labeled controls, including email fields, are discovered automatically; field values are never sent to the planner.
- The local planner is a test fixture, not a claim that an arbitrary natural-language request can be handled without a hosted planner. It resolves semantic graph names at runtime, not hard-coded control IDs.
- Canvas shapes and project/template cards expose keyboard-accessible button semantics so they can be discovered and guided.
- The planner only guides users. It does not execute app actions, inspect form values, or send data to the legacy endpoint.
- Form guidance advances on a validated browser submit, not merely a button click. That still does not prove that an invite was delivered. The demo's invitation handler is simulated, and project/support forms only navigate to simulated receipt pages.
- The SDK cannot discover routes that have never appeared in rendered same-origin links; apps with hidden routes or dynamic parameters still need a manifest or route resolver. Repeated unlabeled controls remain ambiguous.
- Some demo actions, notably export and sharing, are still visual placeholders. Guidance to them does not imply that those product functions work.

Check the integration with `pnpm exec tsc --noEmit` and `pnpm build`. Browser automation remains outside this pilot's verification scope.
