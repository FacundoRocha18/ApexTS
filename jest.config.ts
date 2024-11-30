import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json" }], // Configura ts-jest correctamente
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
	testMatch: ["**/__tests__/**/*.test.ts"], // Busca archivos de prueba
	moduleDirectories: ["node_modules", "<rootDir>/src"], // Resuelve módulos de src/
};

export default config;
