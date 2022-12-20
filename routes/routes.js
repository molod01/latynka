import { Router } from 'express';
import { translate } from '../middleware/translator.js';

const show = (req, res, next) => {
	if (!req.direction) {
		req.direction = 'toLatin';
	}
	res.render('index', {
		cyrillic: req.cyrillic,
		latin: req.latin,
		direction: req.direction,
	});
};

const router = Router();
router.route('/').get(show).post(translate, show);

export default router;
