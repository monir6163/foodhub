import { providerActions } from "@/actions/getProviders";
import { ProvidersClient } from "@/components/modules/providers/ProvidersClient";
import { ProvidersHero } from "@/components/modules/providers/ProvidersHero";
import { ProvidersLoadingSkeleton } from "@/components/modules/providers/ProvidersLoadingSkeleton";
import { Suspense } from "react";

export default async function ProvidersPage() {
  const providers = await providerActions();

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <ProvidersHero />
      <Suspense fallback={<ProvidersLoadingSkeleton />}>
        <ProvidersClient initialProviders={providers?.data?.data || []} />
      </Suspense>
    </div>
  );
}
