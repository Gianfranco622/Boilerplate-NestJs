import { env } from 'process';
import { Environment } from '../interfaces';
import { config } from 'dotenv';
import { LOGGER_TYPE } from '../constants';

config();

export const environment: Environment = {
	databaseConfig: {
		databaseUser: env.DATABASE_USER,
		databasePassword: env.DATABASE_PASSWORD,
		databaseName: env.DATABASE_NAME,
		databaseHost: env.DATABASE_HOST
	},

	mailerConfig: {
		host: env.MAILER_HOST,
		port: Number(env.MAILER_PORT),
		secure: Boolean(env.MAILER_SECURE == 'true'),
		auth: {
			user: env.MAILER_USER,
			pass: env.MAILER_PASS
		}
	},

	winstonConfig: {
		format: env.LOGGER_FORMAT,
		appName: env.LOGGER_APP_NAME,
		listLoggerConfig: [
			{
				filename: `${env.LOG_FOLDER}/${env.LOGGER_FILENAME_INFO}`,
				datePattern: env.LOGGER_DATE_PATTERN,
				zippedArchive: Boolean(env.LOGGER_ZIPPED_ARCHIVE == 'true'),
				watchLog: Boolean(env.LOGGER_WATCH_LOG == 'true'),
				maxSize: env.LOGGER_MAX_SIZE,
				maxFiles: env.LOGGER_MAX_FILES,
				level: LOGGER_TYPE.INFO
			},
			{
				filename: `${env.LOG_FOLDER}/${env.LOGGER_FILENAME_WARN}`,
				datePattern: env.LOGGER_DATE_PATTERN,
				zippedArchive: Boolean(env.LOGGER_ZIPPED_ARCHIVE == 'true'),
				watchLog: Boolean(env.LOGGER_WATCH_LOG == 'true'),
				maxSize: env.LOGGER_MAX_SIZE,
				maxFiles: env.LOGGER_MAX_FILES,
				level: LOGGER_TYPE.WARN
			},
			{
				filename: `${env.LOG_FOLDER}/${env.LOGGER_FILENAME_ERROR}`,
				datePattern: env.LOGGER_DATE_PATTERN,
				zippedArchive: Boolean(env.LOGGER_ZIPPED_ARCHIVE == 'true'),
				watchLog: Boolean(env.LOGGER_WATCH_LOG == 'true'),
				maxSize: env.LOGGER_MAX_SIZE,
				maxFiles: env.LOGGER_MAX_FILES,
				level: LOGGER_TYPE.ERROR
			}
		]
	},

	logstashConfig: {
		port: Number(env.LOGSTASH_PORT),
		enable: Boolean(env.LOGSTASH_ENABLE == 'true'),
		node_name: env.LOGSTASH_NODE_NAME,
		host: env.LOGSTASH_HOST,
		max_connect_retries: Number(env.LOGSTASH_MAX_CONNECT_RETRIES)
	}
};
