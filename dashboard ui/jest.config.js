module.exports = {
 
  preset: './jest-preset.js',
 
  testEnvironment: 'jsdom',
 
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/index.js'
  ],
 
  transform: {
    '^.+\\.(js||jsx)$': 'babel-jest',
  },
 
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
 
  moduleNameMapper: {
 
    '\\.css$': 'identity-obj-proxy',
 
  },
 
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
 
  coverageThreshold: {
 
    global: {
 
      branches: 80,
 
      functions: 80,
 
      lines: 80,
 
      statements: 80,
 
    },
 
  },
 
};