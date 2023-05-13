import Joi from 'joi';

export const validationSchema = Joi.object({
	MAILER_HOST: Joi.string().required(),
	MAILER_PORT: Joi.number().required(),
	MAILER_SECURE: Joi.boolean().required(),
	MAILER_USER: Joi.string().email().required(),
	MAILER_PASS: Joi.string().required(),
	LOGGER_FORMAT: Joi.string().required(),
	LOGGER_APP_NAME: Joi.string().required(),
	LOG_FOLDER: Joi.string().required(),
	LOGGER_FILENAME_INFO: Joi.string().required(),
	LOGGER_FILENAME_WARN: Joi.string().required(),
	LOGGER_FILENAME_ERROR: Joi.string().required(),
	LOGGER_DATE_PATTERN: Joi.string().required(),
	LOGGER_ZIPPED_ARCHIVE: Joi.string().required(),
	LOGGER_WATCH_LOG: Joi.boolean().required(),
	LOGGER_MAX_SIZE: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
	LOGGER_MAX_FILES: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
	LOGSTASH_PORT: Joi.number().required(),
	LOGSTASH_ENABLE: Joi.boolean().default(false),
	LOGSTASH_NODE_NAME: Joi.string().required(),
	LOGSTASH_HOST: Joi.string().required(),
	LOGSTASH_MAX_CONNECT_RETRIES: Joi.number().required()
});
