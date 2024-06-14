# Server

It is a REST application that serves connection with a Mongo database, stores images in Cloudinary and provides user authentication with JWT tokens. To make it run properly please follow the instructions below.

### Project requirements:

Begin with installing all project dependencies:
`npm i`

To use all functionalities you'll need to set up a MongoDB database and cloudinary account. Then add corresponding credentials to your **.env** file in the main project directory. It should look like this:

````MONGO DB
Name of the app might also differ depending on your setup
DB=mongodb+srv://<username>:<password>@totartapp.6svr47p.mongodb.net/TotArt?retryWrites=true&w=majority

Cloudinary
CLOUD_NAME = <your credentials>
API_KEY = <your credentials>
API_SECRET = -<your credentials>

TOKEN SERVICES (Value is completely up to you)
SECRET_OR_PRIVATE_KEY = <your credentials>```
````

And that should be all! To run the app use command:

`npm run start`
