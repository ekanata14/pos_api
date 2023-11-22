import express from 'express';
import connection from '../../database/db.mjs';

const router = express.Router();

const table = "suppliers";

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
    const idSupplier = req.params.id;
    const sql = `SELECT * FROM ${table} WHERE id_supplier = ?`;
    connection.query(sql, [idSupplier], (err, results, fields) => {
        checkError(err);
        res.json(results);
    }); 
});

router.post("/", (req, res) => {
    const {nameSupplier, phoneSupplier, emailSupplier} = req.body;
    const sql = `INSERT INTO ${table}(name_supplier, phone_supplier, email_supplier) VALUES(?,?,?)`;
    connection.query(sql, [nameSupplier, phoneSupplier, emailSupplier], (err, results, fields) => {
        checkError(err);
        res.send({message: "Data successfully inserted"});
    });
});

router.put("/", (req, res) => {
    const {idSupplier, nameSupplier, phoneSupplier, emailSupplier} = req.body;
    const sql = `UPDATE ${table} SET name_supplier = ?, phone_supplier = ?, email_supplier = ? WHERE id_supplier = ?`;
    connection.query(sql, [nameSupplier, phoneSupplier, emailSupplier, idSupplier], (err, results, fields) => {
        checkError(err);
        res.send({message: "Data successfully updated"});
    });
});

router.delete("/:id", (req, res) => {
    const idSupplier = req.params.id;
    const sql = `DELETE FROM ${table} WHERE id_supplier = ?`;
    connection.query(sql, [idSupplier], (err, results, fields) => {
        checkError(err);
        res.send({message: "Data successfully deleted"});
    });
});

export default router;