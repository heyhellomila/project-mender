module.exports = {
    verbose: true,
    roots: ["<rootDir>/src", "<rootDir>/tests"],
    testMatch: ["**/tests/**/*.+(ts|tsx)", "**/?(*.)+(spec|test).+(ts|tsx)"],
    transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
    testPathIgnorePatterns: ["<rootDir>/tests/_mocks_"]
};
