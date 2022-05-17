require('dotenv').config();

const fs = require('fs');

const appYamlContent = `runtime: nodejs16

manual_scaling:
  instances: 1
resources:
  cpu: 1
  memory_gb: 0.5
  disk_size_gb: 10
beta_settings:
  cloud_sql_instances: ${process.env.DB_INSTANCE_CONNECTION_NAME}
env_variables:
  SECRET_TOKEN: '${process.env.SECRET_TOKEN}'
  DB_HOST: ${process.env.DB_HOST}
  DB_USER: ${process.env.DB_USER}
  DB_PASSWORD: '${process.env.DB_PASSWORD}'
  DB_DATABASE: ${process.env.DB_DATABASE}
  DB_INSTANCE_CONNECTION_NAME: ${process.env.DB_INSTANCE_CONNECTION_NAME}
`;

fs.writeFileSync('./app.yaml', appYamlContent);
