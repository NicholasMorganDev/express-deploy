
import functions from "firebase-functions";
import express from 'express';
import cors from 'cors';
import { addEmployee, deleteEmployee, editEmployees, getAllEmployees } from "./src/employees.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.send("My cloud function API is working!");
});

app.get('/employees', getAllEmployees)

app.post('/employees', addEmployee);

app.patch('/employees/:docId', editEmployees)

app.delete('/employees/:docId', deleteEmployee)

export const api = functions.https.onRequest(app);
