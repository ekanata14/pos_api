import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/userRoutes.mjs';
import itemRoutes from './src/routes/itemRoutes.mjs';
import categoryRoutes from './src/routes/categoryRoutes.mjs';
import supplierRoutes from './src/routes/supplierRoutes.mjs';
import transactionRoutes from './src/routes/transactionRoutes.mjs';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/item", itemRoutes);
app.use("/category", categoryRoutes);
app.use("/supplier", supplierRoutes);
app.use("/transaction", transactionRoutes);

app.get("/", (req, res) => {
    res.send("This app is using module javascript/ES6");
});

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});