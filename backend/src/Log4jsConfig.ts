import { configure, getLogger } from 'log4js';

export function getNewLogger(name: string) {

    configure({
      appenders: {
        backendData: { 
          type: 'dateFile', 
          compress: true, 
          layout: { type: 'pattern', pattern: '%d %p %z [%c] %m' },
          filename: '../logs/loggedData.log' 
        }
      },
      categories: {
        default: { 
          appenders: [ 'backendData' ], 
          level: 'debug', 
          enableCallStack: true 
        }
      }
    });

    return getLogger(name);
  }
