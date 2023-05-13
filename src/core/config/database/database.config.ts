import { environment } from '@core/environment';

export function databaseConfig() {
	const username = environment.databaseConfig.databaseUser;
	const password = environment.databaseConfig.databasePassword;
	const dbName = environment.databaseConfig.databaseName;
	const host = environment.databaseConfig.databaseHost;

	return {
		uri: `mongodb+srv://${username}:${password}@${host}`,
		dbName
	};
}
