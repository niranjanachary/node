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
		},
};
module.exports = router;