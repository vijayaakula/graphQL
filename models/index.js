// models/index.mjs (or .js with "type": "module" in package.json)
import { readdirSync } from 'fs';
import { basename, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const env = process.env.NODE_ENV || 'development';

// Note: config.json should be converted to config.mjs or use createRequire
const config = (await import('../config/config.cjs')).default[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const files = readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename(__filename) &&
    file.slice(-3) === '.js' &&  // Changed to .mjs for ESM model files
    file.indexOf('.test.js') === -1
  ));

// Dynamic imports for model files
for (const file of files) {
  const modelModule = await import(`./${file}`);
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Set up associations
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;