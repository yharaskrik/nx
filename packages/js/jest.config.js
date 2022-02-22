module.exports = {
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[t]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' } },
  displayName: 'jest',
  testEnvironment: 'node',
};
