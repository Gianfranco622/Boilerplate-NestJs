import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import LogstashTransport from 'winston-logstash/lib/winston-logstash-latest';
import { environment } from '@core/environment';

const listLoggerConfig = environment.winstonConfig.listLoggerConfig.map((config) => {
	return new winston.transports.DailyRotateFile({ ...config });
});

const transports = [
	new winston.transports.Console({
		format: winston.format.combine(
			winston.format.json(),
			winston.format.timestamp(),
			winston.format.errors({ stacks: true }),
			nestWinstonModuleUtilities.format.nestLike(environment.winstonConfig.appName, {
				colors: true,
				prettyPrint: true
			})
		)
	}),
	...listLoggerConfig
];

const logstashTransport = environment.logstashConfig.enable
	? [
			new LogstashTransport({
				port: environment.logstashConfig.port,
				node_name: environment.logstashConfig.node_name,
				host: environment.logstashConfig.host,
				onError(_err) {
					console.error('error logtash', _err);
				},
				max_connect_retries: environment.logstashConfig.max_connect_retries
			}),
			...transports
	  ]
	: transports;

export const loggerConfig = {
	logger: WinstonModule.createLogger({
		exitOnError: false,
		format: winston.format.combine(winston.format.timestamp({ format: environment.winstonConfig.format }), winston.format.json()),
		transports: [...logstashTransport]
	})
};
