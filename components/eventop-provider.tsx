'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEventop } from '@eventop/sdk/browser';
import { EventopProvider as SDKProvider } from '@eventop/sdk/react';
import { planDemoRequest } from '../lib/eventop-planner';

export function EventopProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const [client] = useState(() => createEventop({
    appId: 'eventop-demo',
    appName: 'Eventop Demo',
    buildId: 'demo-local-v3',
    planner: planDemoRequest,
    router: route => routerRef.current.push(route),
  }));

  return <SDKProvider client={client}>{children}</SDKProvider>;
}
