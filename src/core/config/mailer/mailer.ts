import { environment } from '@core/environment';
import { Logger } from '@nestjs/common';
import { createTransport } from 'nodemailer';

const logger = new Logger('NodeMailer');

export const transporter = createTransport({
	host: environment.mailerConfig.host,
	port: environment.mailerConfig.port,
	secure: environment.mailerConfig.secure,
	auth: environment.mailerConfig.auth
});

transporter
	.verify()
	.then(() => {
		logger.log('Initialized mail server');
	})
	.catch((error) => {
		logger.error('An error occurred when initializing the mail server', error);
	});
