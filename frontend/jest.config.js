module.exports = {
    preset: "jest-expo",
    verbose: true,
    clearMocks: true,
    collectCoverage: true,
    updateSnapshot: true,
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    setupFiles: [
        "./node_modules/react-native-gesture-handler/jestSetup.js"
    ],
    transformIgnorePatterns: [
        "node_modules/?!(react-navigation)"
    ]
};