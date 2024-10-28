// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
}

interface Configuration {
  NODE_ENV: string;
  PORT: number;
}

// Loading process.env as ENV interface

const loadConfiguration = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const validateEnvironmentConfiguration = (config: ENV): Configuration => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }

  return config as Configuration;
};

const configuration = loadConfiguration();

const validatedEnvironmentConfiguration =
  validateEnvironmentConfiguration(configuration);

export { validatedEnvironmentConfiguration as environmentConfiguration };
