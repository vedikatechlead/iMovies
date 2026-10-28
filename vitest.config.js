import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
    // Each file starts its own in-memory replica set; run files one at a time to keep memory low.
    fileParallelism: false,
    testTimeout: 30000,
    hookTimeout: 180000,
    env: {
      NODE_ENV: 'test',
      PAYMENT_PROVIDER: 'mock',
      JWT_SECRET: 'test-only-secret-test-only-secret-1234567890',
      MOCK_PAYMENT_SECRET: 'test-mock-secret',
      RATE_LIMIT_MAX: '100000',
      RATE_LIMIT_AUTH_MAX: '100000',
      RATE_LIMIT_SENSITIVE_MAX: '100000',
      JOBS_ENABLED: 'false',
      LOG_LEVEL: 'silent',
      SEAT_LOCK_MINUTES: '5',
      CORS_ORIGINS: 'http://localhost:5173',
    },
  },
});
