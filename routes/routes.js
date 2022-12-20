import { Router } from 'express';
import { translate } from '../middleware/translator.js';

const clearData = () => {
	return {
		cyrillic: undefined,
		latin: undefined,
		direction: undefined,
	};
};

let data = clearData();
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

router.route('/clear').get((req, res) => {
	data = clearData();
	res.redirect('/');
});

export default router;
