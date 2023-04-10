import cluster from 'cluster';
import http from 'http';
import os from 'os';
import * as Logger from './src/helpers/logger.js';
import Server from './bin/server.js';

let app;
let logger;
let address;
let bind;
let port;
let server;
let serverObj;
let numCPUs;

const initApp = async () => {
  port = 8080;
  app = Server;
  logger = Logger;
  await logger.initLogger();
  app.set('port', port);
  await initAppServer();
};

const initAppServer = async () => {
  numCPUs = os.cpus().length;
  // if (cluster.isMaster) {
  //   let i = 0;
  //   //console.log('Number of CPU ',numCPUs);
  //   for (i=0; i<numCPUs; i++) {
  //     await cluster.fork();
  //   }

  //   await cluster.on('exit', (worker, code, signal) => {
  //     console.log("worker.process.pid------------",worker)
  //     logger.logError(`Cluster Worker died | worker: ${worker.process.pid}`);
  //   });
  // }
  // else {
  try {
    server = await http.createServer(app);
    server.listen(port);
    server.on('listening', () => {
      address = server.address();
      bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
      logger.logDebug(`Listening On: ${bind}`);
      logger.logInfo(`Server running on: ${port}`);
    });
  }
  catch (err) {
    console.error(err);
    throw err;
  }
  // }
};

(async () => {
  process.setMaxListeners(0);
  await initApp();
})();
