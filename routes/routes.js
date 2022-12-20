import { Router } from 'express';
import { translate } from '../middleware/translator.js';

let data = {
	cyrillic: undefined,
	latin: undefined,
	direction: undefined,
};

const router = Router();

router
	.route('/')
	.get((req, res) => {
		if (!data.direction) {
			data.direction = 'toLatin';
		}
		res.render('index', data);
	})
	.post(translate, (req, res) => {
		data = {
			cyrillic: req.cyrillic,
			latin: req.latin,
			direction: req.direction,
		};
		res.redirect('/');
	});

export default router;
