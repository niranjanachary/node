var router ={
	'environment':'dev',
	'dev':
		{
			'database':
			{
				'engine':'mongodb',
				'host':'localhost',
				'port':'27017',
				'database':'nodejs'
			},
			'redis':
			{
				'enable': 0,
				'host':'localhost',
				'port':'6379',
				'ttl': 260
			},
		},

	'prod':
		{
			'database':
			{
				'engine':'mongodb',
				'host':'localhost',
				'port':'27017',
				'database':'nodejs'
			},
			'redis':
			{
				'enable': 0,
				'host':'localhost',
				'port':'27017',
				'ttl': 260
			},
		},
};
module.exports = router;