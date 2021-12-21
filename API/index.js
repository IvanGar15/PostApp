const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const errorController = require('./controllers/error');
const User = require('./models/user');
const Posts = require('./models/posts');
const app = express();
const port = 3000;

User.sync();
Posts.sync();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    next();
});

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(port, () => console.log('App en línea'))