export interface EnvironmentVariables {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
}

export interface ValidatedEnvironmentConfiguration {
  NODE_ENV: string;
  PORT: number;
}
