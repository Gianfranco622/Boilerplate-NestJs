import { LOGGER_TYPE } from '../constants';

export interface LoggerConfig {
	filename: string;
	datePattern: string;
	zippedArchive: boolean;
	watchLog: boolean;
	maxSize: number | string;
	maxFiles: number | string;
	level: LOGGER_TYPE;
}

export interface LogstashConfig {
	port: number;
	enable: boolean;
	node_name: string;
	host: string;
	max_connect_retries: number;
}

export interface WinstonConfig {
	format: string;
	appName: string;
	listLoggerConfig: LoggerConfig[];
}
