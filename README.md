# o-auth-authentication

> handles local, google and facebook authentication

This example shows local, google as well as facebook authentication.
Want to make your application more secure and with easy logins and sign ups. Sit back and copy the code, let google and facebook handle authentication also know as o-authentication.

## Install

With [yarn](https://yarnpkg.com/en/) installed, run

```
$ yarn install
```
Make sure to create a variables.env file in the root directory with contents as follows :
```
PORT = 
SESSION_SECRET = 
MONGO_URL = 
FACEBOOK_APP_ID = 
FACEBOOK_APP_SECRET = 
GOOGLE_CLIENT_ID = 
GOOGLE_CLIENT_SECRET = 
```

## Usage

```js
$ yarn start

This will start the application at port 3000
```

## See Also

- [`PassportJs`](https://github.com/jaredhanson/passport)
- [`Passport-o-auth-google20`](https://github.com/mstade/passport-google-oauth2)
- [`Passport-local`](https://github.com/jaredhanson/passport-local)
- [`Passport-facebook`](https://github.com/jaredhanson/passport-facebook)

## License

MIT
