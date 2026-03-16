import { ProviderDetailsHero } from "@/components/modules/providers/ProviderDetailsHero";
import { ProviderDetailsLoading } from "@/components/modules/providers/ProviderDetailsLoading";

import { ProviderMealsGrid } from "@/components/modules/providers/ProviderMealsGrid";
import { providerService } from "@/services/provider.service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const { data } = await providerService.getProviders();
  return (
    data?.data?.map((provider: any) => ({
      id: provider.id,
    })) || []
  );
}

export default async function ProviderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await providerService.getProviderById(id);
  const provider = response?.data?.data;

  if (!provider) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <ProviderDetailsHero provider={provider} />
      <Suspense fallback={<ProviderDetailsLoading />}>
        <ProviderMealsGrid meals={provider.meals || []} providerId={id} />
      </Suspense>
    </div>
  );
}
