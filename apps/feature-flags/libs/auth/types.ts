export type ProviderType = "oauth" | "email" | "credentials";

export interface ProviderOptions {
  id: string;
  name: string;
  type: ProviderType;
  options?: Record<string, unknown>;
}

export interface Provider {
  [key: string]: ProviderOptions;
}
