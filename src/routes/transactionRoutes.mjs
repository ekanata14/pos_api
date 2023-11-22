import express from 'express';
import connection from '../../database/db.mjs';

const router = express.Router();

const table = "transactions";

const checkError = (err) => {
    if(err) throw err;
}

router.get("/", (req, res) => {
    const sql = `SELECT * FROM ${table}`;
    connection.query(sql, (err, results, fields) => {
        checkError(err);
        res.json(results);  
    });
});

export default router;
