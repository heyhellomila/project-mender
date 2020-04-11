import { configure, getLogger } from 'log4js';

export function getNewLogger(name: string) {

    configure({
      appenders: {
        allData: { type: 'dateFile', layout: { type: 'pattern', pattern: '%d %p %z [%c] % %m' }, filename: '../logs/log.log' }
      },
      categories: {
        default: { appenders: [ 'allData' ], level: 'info' }
      }
    });

    return getLogger(name);
  }
