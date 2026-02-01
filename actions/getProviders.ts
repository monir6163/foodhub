import { providerService } from "@/services/provider.service";

export const providerActions = async () => {
  const res = await providerService.getProviders();
  return res;
};
