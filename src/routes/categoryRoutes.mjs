import express from 'express';
import connection from '../../database/db.mjs';

const router = express.Router();

const table = "categories";

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

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM ${table} WHERE id_category = ?`;
    connection.query(sql, [id], (err, results, fields) => {
        checkError(err);
        res.json(results);
    });
});

router.post("/", (req, res) => {
    const { nameCategory } = req.body;
    const sql = `INSERT INTO ${table}(name_category) VALUES(?)`;
    connection.query(sql, [nameCategory], (err, results, fields) => {
        checkError(err);
        res.send({message: "Data inserted successfully"});
    });
});

router.put("/", (req, res) => {
    const { idCategory, nameCategory } = req.body;
    const sql = `UPDATE ${table} SET name_category = ? WHERE id_category = ?`;
    connection.query(sql, [nameCategory, idCategory], (err, results, fields) => {
        checkError(err);
        res.send({message: "Data updated sucessfully"});
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM ${table} WHERE id_category = ?`;
    connection.query(sql, [id], (err, results, fields) => {
        checkError(err);
        res.send({message: "Data deleted successfully"});
    });
});

export default router;
