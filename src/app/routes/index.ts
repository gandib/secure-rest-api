import { Router } from 'express';
import { authRoutes } from '../modules/Auth/auth.routes';

const router = Router();
const modulesRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
