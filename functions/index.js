
import functions from "firebase-functions";
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.send("My cloud function API is working!");
});

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

export const api = functions.https.onRequest(app);
