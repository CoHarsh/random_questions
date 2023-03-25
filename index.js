const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./router');
const connect_db = require('./connect_db');
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use('/api', router);

app.listen(PORT , async () => {
    await connect_db();
    console.log(`Server listening on port ${PORT}`);
});

