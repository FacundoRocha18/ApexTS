import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  moduleNameMapper: {
		"^@config$": "<rootDir>/src/config/index",
    "^@core$": "<rootDir>/src/core/index",
		"^@database$": "<rootDir>/src/database/index",
    "^@exceptions$": "<rootDir>/src/exceptions/index",
    "^@factory$": "<rootDir>/src/factory/index",
    "^@http$": "<rootDir>/src/http/index",
		"^@logger$": "<rootDir>/src/logger/index",
    "^@middleware$": "<rootDir>/src/middleware/index",
    "^@parser$": "<rootDir>/src/parser/index",
    "^@router$": "<rootDir>/src/router/index",
  },
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts"],
};

export default config;
