var express = require('express');
var app = express();

//Middleware function to log request protocol
app.use('/:lng', function(req, res, next) {
	res.locals.user = null;
	if(req.session.passport){
        res.locals.user = req.session.passport.user;
	}
	i18n.setLocale(res.locals, req.params.lng);
    var _render = res.render;
    res.render = function( view, options, fn ) {
		//get theme from db
		var _view = view;
		view = 'layout/index';
		options.ejs_page = _view;
        // _.extend( options, {session: true} );
        _render.call( this, view, options, fn );
	}
	next();
});
app.use('/:lng/hybridauth', function(req, res, next) {
	if(req.originalUrl){
		social_provider = req.originalUrl;
		var split = social_provider.split('/');
		social_provider = split[split.length - 1];
		var split = social_provider.split('?');
		social_provider = split[0];
	}
	if(social_provider == 'facebook'){
		require('./core/passport/facebook-strategy');   
		app.use(passport.initialize());
		app.use(passport.session());
	}
	// console.log(social_provider);
	next();
});

// app.use( '/:lng/admin', function( req, res, next ) {
// 	// // override logic
// 	i18n.setLocale(res.locals, req.params.lng);
// 	next();
// });
module.exports = app;