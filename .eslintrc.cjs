// .eslintrc.cjs
module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the TypeScript parser
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'next/core-web-vitals', // Next.js recommended settings
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // Disallow explicit `any` usage
      // Add other TypeScript rules or overrides as needed
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      
    },

    
  };
  