// Feature Flag SDK - Enhanced with Documentation

/** Configuration for caching mechanism */
export interface CacheConfig {
  /** Enable or disable caching (default: true) */
  enabled?: boolean;
  /** Time-to-Live for cache entries in milliseconds (default: 5 minutes) */
  ttl?: number;
  /** Maximum number of cache entries (default: 100) */
  maxSize?: number;
}

/** SDK Configuration Options */
export interface SDKConfig {
  /** Base URL for the feature flag service (optional) */
  baseURL?: string;
  /** Project identification key (required) */
  projectKey: string;
  /** Environment identification key (required) */
  environmentKey: string;
  /** Caching configuration options */
  cache?: CacheConfig;
  /** Custom fetch implementation (optional) */
  fetchImpl?: typeof fetch;
  /** Flags to preload during initialization */
  preloadFlags?: string[];
}

/** Feature flag data structure */
export interface Flag {
  slug: string;
  enabled: boolean;
  payload?: unknown;
  expiredAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  error?: boolean;
}

export class FlagsSDK {
  private config: Required<SDKConfig>;
  private readonly BASE_URL: string;
  private cache: Map<
    string,
    { data: Flag | { flags: Flag[] }; timestamp: number }
  >;
  private readonly fetchImplementation: typeof fetch;
  private initPromise: Promise<void> | null = null;

  /**
   * Create a new Feature Flag Client
   * @param config - Configuration options for the SDK
   * @throws {Error} If project or environment keys are missing
   */
  constructor(config: SDKConfig) {
    if (!config.projectKey || !config.environmentKey) {
      throw new Error("Project Key and Environment Key are required");
    }

    this.config = {
      baseURL: config.baseURL || "https://flags.basestack.co/api/v1", // Fallback default
      fetchImpl:
        config.fetchImpl ||
        (typeof window !== "undefined" ? window.fetch : globalThis.fetch),
      cache: {
        enabled: true,
        ttl: 5 * 60 * 1000, // Default 5 minutes
        maxSize: 100, // Default max cache entries
        ...config.cache,
      },
      preloadFlags: [],
      ...config,
    };

    this.BASE_URL = this.config.baseURL;
    this.cache = new Map();
    this.fetchImplementation = this.config.fetchImpl.bind(globalThis);

    // Validate fetch implementation
    if (!this.fetchImplementation) {
      throw new Error(
        "Fetch API is not available. Please provide a fetch implementation.",
      );
    }
  }

  /**
   * Initialize SDK by preloading specified flags or all flags
   * @returns Promise resolving when flags are loaded
   */
  async init(): Promise<void> {
    // Prevent multiple simultaneous initializations
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      // If specific flags to preload are provided
      if (this.config.preloadFlags && this.config.preloadFlags.length > 0) {
        await Promise.all(
          this.config.preloadFlags.map((slug) => this.getFlag(slug)),
        );
      } else {
        // Otherwise, preload all flags
        await this.getAllFlags();
      }
    })();

    return this.initPromise;
  }

  /**
   * Check if a cache entry is still valid
   * @param cacheKey - Unique key for the cache entry
   * @returns Boolean indicating cache validity
   */
  private isCacheValid(cacheKey: string): boolean {
    // Check if caching is disabled
    if (!this.config.cache.enabled) return false;

    const cached = this.cache.get(cacheKey);
    return cached
      ? Date.now() - cached.timestamp < this.config.cache.ttl!
      : false;
  }

  /**
   * Prune cache to maintain maximum size
   */
  private pruneCache(): void {
    // Remove oldest entries if cache exceeds max size
    if (this.cache.size > this.config.cache.maxSize!) {
      const oldestKey = this.cache.keys().next().value!;
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Make an HTTP request with optional caching
   * @param endpoint - API endpoint to request
   * @param options - Additional fetch options
   * @returns Parsed response data
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.BASE_URL}${endpoint}`;
    const cacheKey = url + JSON.stringify(options.headers || {});

    // Check cache first
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data as T;
    }

    const defaultHeaders = {
      "Content-Type": "application/json",
      "x-project-key": this.config.projectKey,
      "x-environment-key": this.config.environmentKey,
    };

    const response = await this.fetchImplementation(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.json();

      return {
        enabled: false,
        error: true,
        errorMessage: errorBody.message || "Request failed",
      } as T;
    }

    const data = await response.json();

    if (this.config.cache.enabled) {
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });
      this.pruneCache();
    }

    return data as T;
  }

  /**
   * Clear entire cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Clear cache for a specific flag
   * @param slug - Flag slug to clear from cache
   */
  clearFlagCache(slug: string): void {
    Array.from(this.cache.entries()).forEach(([key]) => {
      if (key.includes(`/flags/${slug}`)) {
        this.cache.delete(key);
      }
    });
  }

  /**
   * Retrieve a specific flag by its slug
   * @param slug - Unique identifier for the flag
   * @returns Flag details
   * @throws {Error} If slug is not provided
   */
  async getFlag(slug: string): Promise<Flag> {
    if (!slug) {
      throw new Error("Flag slug is required");
    }

    return this.request<Flag>(`/flags/${encodeURIComponent(slug)}`);
  }

  /**
   * Retrieve all flags
   * @returns List of flags
   */
  async getAllFlags(): Promise<{ flags: Flag[] }> {
    return this.request<{ flags: Flag[] }>("/flags");
  }
}
