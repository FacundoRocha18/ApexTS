import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  moduleNameMapper: {
    "^@core$": "<rootDir>/src/core/index",
    "^@config$": "<rootDir>/src/config/index",
    "^@exceptions$": "<rootDir>/src/exceptions/index",
    "^@factory$": "<rootDir>/src/factory/index",
    "^@http$": "<rootDir>/src/http/index",
    "^@middleware$": "<rootDir>/src/middleware/index",
    "^@parser$": "<rootDir>/src/parser/index",
    "^@router$": "<rootDir>/src/router/index",
  },
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts"],
};

export default config;
