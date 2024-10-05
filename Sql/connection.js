
const sql = require('mssql/msnodesqlv8');

// const sql = require('msnodesqlv8');


require('dotenv').config();

// Configuration object
const config = {
    server: "ABHISHEK\\SQLEXPRESS01", // Server name (e.g., 'localhost\\SQLEXPRESS')
    database: "Dev", 
    // Database name
    // driver:"",
    options: {
        trustedConnection: true, // Use Windows Authentication
       
    },
};

// Function to connect to the database
const connectToDatabase = async () => {
    try {
        await sql.connect(config, function(err){
            if(err) console.log("yaha se",err);
            // let request = new sql.request();
            //  console.log(request);
            console.log('Connected to SQL Server successfully!');

        });
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err; // Rethrow the error for further handling
    }
};

// Export the connection function and sql object for queries
module.exports = {
    connectToDatabase,
    sql,
};
