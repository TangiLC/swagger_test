const mariadb = require('mariadb');

const frequentQueriesPool = mariadb.createPool({
	host: process.env.BddHost,
	user: process.env.BddUser,
	password: process.env.BddPassword,
	connectionLimit: process.env.BddConnectionLimit,
	database: process.env.BddDatabase,
});

module.exports = {
	getConnection: function () {
		return new Promise((resolve, reject) => {
			frequentQueriesPool
				.getConnection()
				.then(function (connection) {
					resolve(connection);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	},
};

//mysql -h cosmos-api.cafbohaswus8.eu-west-1.rds.amazonaws.com -P 3306 -u cosmosapi -pP2n5JTFe3b9h cosmos
//mysql -h 185.223.31.247 -P 3306 -u u3_xGoZJrqBGD -pF.qnnc.KkA9E1gCP@Pw1zI=C s3_new_db
