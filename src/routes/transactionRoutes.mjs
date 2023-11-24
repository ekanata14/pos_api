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

router.get("/:id", (req, res) => {
    const idTransaction = req.params.id;
    const sql = `SELECT * FROM ${table} WHERE id_transaction = ?`;
    connection.query(sql, (err, results, fields) => {
        checkError(err);
        res.json(results);
    });
});

router.post("/in", (req, res) => {
    const {categoryId, itemId, supplierId, userId, nameItem, itemIn, itemOut, price, sellPrice, dateTransaction} = req.body;
    const sql = `INSERT INTO ${table} (category_id, item_id, supplier_id, user_id, name_item, item_in, item_out, price, sell_price, date_transaction)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [categoryId, itemId, supplierId, userId, nameItem, itemIn, itemOut, price, sellPrice, dateTransaction], (err, results, fields) => {
        checkError(err);
        res.json({message: "Item Inserted Successfully"});
    });
});

router.post("/out", (req, res) => {
    const {categoryId, itemId, supplierId, userId, nameItem, itemIn, itemOut, price, sellPrice, dateTransaction} = req.body;
    const sql = `INSERT INTO ${table} (category_id, item_id, supplier_id, user_id, name_item, item_in, item_out, price, sell_price, date_transaction)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [categoryId, itemId, supplierId, userId, nameItem, itemIn, itemOut, price, sellPrice, dateTransaction], (err, results, fields) => {
        checkError(err);
        res.json({message: "Item Inserted Successfully"});
    });
});

router.put("/", (req, res) => {
    const {transactionId, categoryId, itemId, supplierId, userId, nameItem, itemIn, itemOut, price, sellPrice, dateTransaction} = req.body;
    const sql = `UPDATE transactions
    SET 
      category_id = ?,
      item_id = ?,
      supplier_id = ?,
      user_id = ?,
      name_item = ?,
      item_in = ?,
      item_out = ?,
      price = ?,
      sell_price = ?,
      date_transaction = ?
    WHERE
      id_transaction = ?;`
    connection.query(sql, [categoryId, itemId, supplierId, userId, nameItem, itemIn, itemOut, price, sellPrice, dateTransaction, transactionId], (err, results, fields) => {
        checkError(err);
        res.json("Data Successfully updated");
    });
});

router.delete("/:id", (req, res) => {
    const transactionId = req.params.id;
    const sql = `DELETE FROM ${table} WHERE id_transaction = ?`;
    connection.query(sql, [transactionId], (err, results, fields) => {
        checkError(err);
        res.json({message: "Data successfully deleted"});
    })
});

export default router;
