import { Router } from 'express';
import * as authController from '../controller/authController.js';

const router = Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

export default router;
