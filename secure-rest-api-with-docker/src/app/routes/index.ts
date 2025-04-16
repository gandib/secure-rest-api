import { Router } from 'express';
import { authRoutes } from '../modules/Auth/auth.routes';
import { paymentRoutes } from '../modules/Payment/payment.route';

const router = Router();
const modulesRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/payments',
    route: paymentRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
