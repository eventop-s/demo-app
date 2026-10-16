import path from 'node:path';

const appReact = path.resolve(process.cwd(), 'node_modules/react');

const nextConfig = {
  transpilePackages: [
    '@eventop/sdk', '@eventop/browser', '@eventop/core', '@eventop/react',
    '@eventop/ai', '@eventop/overlay', '@eventop/adapters-dom', '@eventop/adapters-virtual',
  ],
  webpack(config) {
    // Local linked SDK packages must use the app's React 18 instance.
    config.resolve.alias = {
      ...config.resolve.alias,
      'react$': appReact,
      'react/jsx-runtime$': path.join(appReact, 'jsx-runtime.js'),
      'react/jsx-dev-runtime$': path.join(appReact, 'jsx-dev-runtime.js'),
    };
    return config;
  },
};

export default nextConfig;
