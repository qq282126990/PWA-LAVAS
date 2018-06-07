import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import tracer from 'tracer'
import router from './routers/router.mjs'
const logger = tracer.console();

const app = express();
const HOST = process.env.HOST||'localhost';
const PORT = process.env.PORT||8888;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('port',PORT);

// seesion
app.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 6000000}
}));
app.use('/api', router);//需要放到最后，否则无法使用前面的

app.listen(PORT,HOST);
console.warn('server start listen on '+HOST+':'+PORT);
