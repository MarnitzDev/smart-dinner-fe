export interface AppConfig {
  apiUrl: string;
}

export const environment: Partial<AppConfig> = {};

export function loadAppConfig(): Promise<void> {
  return fetch('assets/config.json')
    .then((response) => response.json())
    .then((config: AppConfig) => {
      environment.apiUrl = config.apiUrl;
    });
}
