import {LoggerFactoryOptions, LogGroupRule, LogLevel, LoggerFactory, LFService} from "typescript-logging";

const options = new LoggerFactoryOptions();
options.addLogGroupRule(new LogGroupRule(new RegExp("service.+"), LogLevel.Error));
options.addLogGroupRule(new LogGroupRule(new RegExp("startup.+"), LogLevel.Info));

export const loggerFactory: LoggerFactory = LFService.createNamedLoggerFactory("logger", options);