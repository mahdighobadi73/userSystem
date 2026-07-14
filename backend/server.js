const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/db');

async function startServer() {
    try {
        // Load environment variables from .env file
        dotenv.config();

        // Connect to MongoDB
        await connectDB();

        // Start the server
        const PORT = process.env.PORT || 5000;
        app.listen( PORT, () => {
            console.log( `Server is running on port ${ PORT }` );
        } );
    } catch ( error ) {
        console.error( "Error starting the server:", error );
        process.exit( 1 );
    }
}

startServer();