import { configure, getLogger } from 'log4js';

export function getNewLogger(name: string) {

    configure({
      appenders: {
        allData: { 
          type: 'dateFile', 
          compress: true, 
          layout: { type: 'pattern', pattern: '%d %p %z [%c] %m' },
          filename: '../logs/loggedData.log' 
        }
      },
      categories: {
        default: { 
          appenders: [ 'allData' ], 
          level: 'info', 
          enableCallStack: true 
        }
      }
    });

    return getLogger(name);
  }
