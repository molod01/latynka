import bodyParser from 'body-parser';
import ejsMate from 'ejs-mate';
import express from 'express';
import path from 'path';
import config from './config/conf.js';
import router from './routes/routes.js';

const app = express();
const __dirname = path.resolve();
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('port', config.PORT);
app.use(express.json());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(router);
app.use(express.static(path.resolve(__dirname, 'views')));
app.listen(config.PORT, console.log(`http://localhost:${config.PORT}`));
