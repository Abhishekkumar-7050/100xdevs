require('dotenv').config();

const { Client } = require('pg');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4242;



  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  // const client = await pool.connect();

 



 //  write the 
 async function addTable() {
  
   await client.connect();

   const result =  await client.query(
    ` CREATE TABLE IF NOT EXISTS SampleTable (
       id INT  PRIMARY KEY,
       Name VARCHAR(255) NOT NULL,
       roll_Nu VARCHAR(255) NOT NULL,
       Course_id VARCHAR(255) NOT NULL
   )
   `)

   console.log(" table created", result);
   
 }
 addTable();

  

  
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});