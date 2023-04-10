import express from 'express';
import bodyParser from 'body-parser';
import routes from '../src/routes/index.js';
import connectDB from '../src/config/db.js';
import helmet from 'helmet';
import { authMiddleWare } from '../src/helpers/authMiddleware.js';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
});

app.use(authMiddleWare);

connectDB();

app.use('/api_v_1', routes);


export default app;