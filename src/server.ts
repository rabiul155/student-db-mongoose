import mongoose from 'mongoose';

process.on('uncaughtException', () => {
  console.log('uncaught exception detected shutting down server');
  process.exit(1);
});

import app from './app';

import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

process.on('unhandledRejection', () => {
  console.log('Unhandled rejection detected shutting down server');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

main();
