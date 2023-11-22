import express from 'express';
import connection from '../../database/db.mjs';

const router = express.Router();

const table = "items";

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
    const sql = `SELECT * FROM ${table} WHERE id_item = ?`;
    connection.query(sql, [id], (err, results, fields) => {
        checkError(err);
        res.json(results);
    });
});

router.post("/", (req, res) => {
    const {categoryId, supplierId, nameItem, price, sellPrice} = req.body;
    const sql = `INSERT INTO ${table}(category_id, supplier_id, name_item, price, sell_price) VALUES (?, ?, ?, ?, ?)`;
    connection.query(sql, [categoryId, supplierId, nameItem, price, sellPrice], (err, results, fields) => {
        checkError(err);
        res.json({message: "Data successfully inserted"});
    });
});

router.put("/", (req, res) => {
    const {itemId, categoryId, supplierId, nameItem, price, sellPrice} = req.body;
    const sql = `UPDATE ${table} SET category_id = ?, supplier_id = ?, name_item = ?, price = ?, sell_price = ? WHERE id_item = ?`;
    connection.query(sql, [categoryId, supplierId, nameItem, price, sellPrice, itemId], (err, results, fields) => {
        checkError(err);
        res.json({message: "Data successfully updated"});
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM ${table} WHERE id_item = ?`;
    connection.query(sql, [id] , (err, results, fields) => {
        checkError(err);
        res.json({message: "Data successfully deleted"});
    });
});

export default router;