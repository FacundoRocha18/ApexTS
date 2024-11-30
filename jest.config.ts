import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
	},
	moduleNameMapper: {
		"^@application$": "<rootDir>/src/application/index",
		"^@config$": "<rootDir>/src/config/index",
		"^@errors$": "<rootDir>/src/errors/index",
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
