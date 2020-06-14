module.exports = class FirstClass{
    constructor(name){
        this.name = name ;
     }
    
    async print(){
        var response =  await Users.find();
        return response;
        // console.log(response);
    }
    async getUser( code ){
        const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, SESS_SECRET } =  config.social.facebook;
        var fetch = require( 'node-fetch' );
    
        let appToken;
        let url = 'https://graph.facebook.com/oauth/access_token?client_id=' + FACEBOOK_CLIENT_ID + '&client_secret=' + FACEBOOK_CLIENT_SECRET + '&grant_type=client_credentials';
        //login as a facebook app to get an "app token"
        return fetch( url, { method: 'GET' } )
            .then( response => response.json() )
            .then( response => {
                appToken = response.access_token;
            //validate "social token", must pass the "app token"
                return fetch( 'https://graph.facebook.com/debug_token?input_token=' + code + '&access_token=' + appToken, {
                    method: 'GET',
                } )
            } )
            .then( response => response.json() )
            .then( response => {return response;
            //check the audience of the token
                const { app_id, is_valid, user_id } = response.data
                if ( app_id !== client_id ) {
                    throw new Error( 'invalid app id: expected [' + client_id + '] but was [' + app_id + ']' );
                }
            //check if the token is valid
                if ( !is_valid ) {
                    throw new Error( 'token is not valid' );
                }
            //get user profile using the app token
                return fetch( 'https://graph.facebook.com/v3.0/' + user_id + '?fields=id,name,picture,email&access_token=' + appToken, {
                    method: 'GET',
                } )
    
            } )
            // .then( response => response.json() )
            // .then( response => {
            // // return the user profile
            //     const { id, picture, email, name } = response;
            //     let user = {
            //         name: name,
            //         pic: picture.data.url,
            //         id: id,
            //         email_verified: true,
            //         email: email
            //     }
            //     return user;
            // } )
    //throw an error if something goes wrong
            .catch( err => {
                throw new Error( "error while authenticating facebook user: " + JSON.stringify( err ) );
            } );
    
    }
};