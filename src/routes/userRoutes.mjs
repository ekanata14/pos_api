import express from 'express';
import connection from '../../database/db.mjs';

const router = express.Router();

const table = "users";
router.get("/", (req, res) => {
    const sql = `SELECT * FROM ${table}`;
    connection.query(
        sql, (err, results, fields) => {
            if(err) throw err;
            res.json(results);
        } 
    ) 
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM ${table} WHERE id_user = ?`;
    connection.query(sql, [id], (err, results, fields) => {
        if(err) throw err;
        res.json(results);
    });
});

router.post("/", (req, res) => {
    const {username, nameUser, email, password, role} = req.body;
    const sql = `INSERT INTO ${table}(username, name_user, email, password, role) VALUES(?, ?, ?, ?, ?)`;
    connection.query(
        sql, [username, nameUser, email, password, role], (err, results, fields) => {
            if(err) throw err;
            res.json({message: "Data successfully inserted"});
        } 
    ); 
});

router.put("/", (req, res) => {
    const {idUser, username, nameUser, email, password, role} = req.body;
    const sql = `UPDATE ${table} SET username = ?, name_user = ?, email = ?, password = ?, role = ? WHERE id_user = ?`;
    connection.query(sql, [username, nameUser, email, password, role, idUser], (err, results, fields) => {
        if(err) throw err;
        res.json({message: "Data successfully updated"});
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM ${table} WHERE id_user = ?`;
    connection.query(sql, [id], (err, results, fields) => {
        if(err) throw err;
        res.json({message: "Data successfully deleted"});
    });
});

export default router;