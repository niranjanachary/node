var router ={
	'environment':'dev',
	'dev':
		{
			'secret':'changeitforprod',
			'template':'html',
			'asset' : 'dev',
			'database':
			{
				// 'engine':'mongodb',
				// 'port':'27017',
				'engine':'mysql',
				'port':'3306',
				'host':'localhost',
				'database':'nodejs',
				'username':'node',
				'password':'niranjan',
			},
			'redis':
			{
				'enable': 0,
				'host':'localhost',
				'port':'6379',
				'pass':'',
				'db':0,
				'ttl': 260
			},
			'session':
			{
				'proxy': 1,
				'secure': false,
				'age': null
			},
			'social':
			{
				'facebook':
				{
					FACEBOOK_CLIENT_ID:'642162635861191',
					FACEBOOK_CLIENT_SECRET:'9dce195ed097f2663b10fb1a16cdcefc',
					SESS_SECRET:'fdasfa'
				}
			}
		},

	'prod':
		{
			'secret':'changeitforprod',
			'template':'html',
			'asset' : 'prod',
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