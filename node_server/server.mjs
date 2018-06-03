import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import tracer from 'tracer'
import router from './routers/router.mjs'
const logger = tracer.console();

const app = express();
const HOST = process.env.HOST||'0.0.0.0';
const PORT = process.env.PORT||8888;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('port',PORT);
app.use('/api', router)

// seesion

app.use(session({
    secret:'super-secret-key',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:6000000}
}));

app.listen(PORT,HOST);
console.warn('server start listen on '+HOST+':'+PORT);
