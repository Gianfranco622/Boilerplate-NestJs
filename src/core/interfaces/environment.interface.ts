import { DatabaseConfig } from './database.interface';
import { LogstashConfig, WinstonConfig } from './logger-config.interface';
import { MailerConfig } from './mailer-config.interface';

export interface Environment {
	winstonConfig: WinstonConfig;
	mailerConfig: MailerConfig;
	logstashConfig: LogstashConfig;
	databaseConfig: DatabaseConfig;
}
