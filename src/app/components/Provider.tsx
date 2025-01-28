"use client";

import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";
import type { PropsWithChildren } from "react";

const ClerkProvider = OriginalClerkProvider as unknown as (
  props: PropsWithChildren<{ 
    publishableKey: string 
    appearance?: any 
  }>
) => JSX.Element;

export function ClientProviders({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      appearance={{
        variables: { colorPrimary: "#000000" },
      }}
    >
      {children}
    </ClerkProvider>
  );
}