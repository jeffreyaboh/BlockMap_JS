declare module '@ethion/blockmap-js' {
  interface BlockMapOptions {
    EMAIL: string;
    API_KEY: string;
  }

  interface HealthCheckResult {
    status: 'healthy' | 'unhealthy';
    auth_token: string | null;
    credentials: {
      email: boolean;
      api_key: boolean;
    };
    errors?: string[];
    timestamp: string;
  }

  interface PingResult {
    status: string;
    message: string;
    timestamp: string;
    [key: string]: any;
  }

  interface AuthenticationResult {
    data: {
      api_key: string;
      auth_token: string;
      [key: string]: any;
    };
    [key: string]: any;
  }

  interface BlockMapPlugin {
    healthCheck(): Promise<HealthCheckResult>;
    pingServer(): Promise<PingResult>;
    getAuthenticationToken(): Promise<AuthenticationResult>;
  }

  function BlockMapJS(options: BlockMapOptions): BlockMapPlugin;

  export = BlockMapJS;
}
