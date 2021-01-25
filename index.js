require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

//call routes
const adminRouter = require('./routes/admin');
const clientRouter = require('./routes/client');

//call middleware
const authMiddleware = require('./middlewares/auth');

const app = express();
const port = process.env.PORT || 3000;

//connected mongodb
const url = `mongodb+srv://lethinh0210:${process.env.PW_MONGODB}@cluster0.ddnqx.mongodb.net/${process.env.DB_MONGODB}?retryWrites=true&w=majority`

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(url, options).then(() => console.log('Connected'));

//Setup view engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SCRET));
app.use(bodyParser.json());

app.use('/', clientRouter);
app.use('/admin',authMiddleware, adminRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});