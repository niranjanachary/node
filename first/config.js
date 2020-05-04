var router ={
	'environment':'dev',
	'dev':
		{
			'secret':'changeitforprod',
			'template':'pug',
			'database':
			{
				'engine':'mongodb',
				'host':'localhost',
				'port':'27017',
				'database':'nodejs',
				'username':'node',
				'password':'niranjan'
			},
			'redis':
			{
				'enable': 0,
				'host':'localhost',
				'port':'6379',
				'pass':'seken1234',
				'db':0,
				'ttl': 260
			},
			'session':
			{
				'proxy': 1,
				'secure': false,
				'age': null
			}
		},

	'prod':
		{
			'secret':'changeitforprod',
			'template':'html',
			'database':
			{
				'engine':'mongodb',
				'host':'localhost',
				'port':'27017',
				'database':'admin',
				'username':'root',
				'password':'niranjan'
			},
			'redis':
			{
				'enable': 0,
				'host':'localhost',
				'port':'27017',
				'pass':'seken123',
				'db':0,
				'ttl': 260
			},
			'session':
			{
				'proxy': 1,
				'secure': true,
				'age': (60 * 60 * 1000)
			}
		},
};
module.exports = router;