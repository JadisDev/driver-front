module.exports = {
    type: 'module',
    testEnvironment: 'jsdom',
    collectCoverage: true,
    coverageReporters: ["lcov", "text"],
    preset: 'ts-jest'
};