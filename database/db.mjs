import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pos_api"
});

connection.connect((error) => error ? console.log("Failed to connect: ", error) : console.log("Database Connected"));

export default connection;