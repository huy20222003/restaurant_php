import authRouter from './authRouter.mjs';
import dishesRouter from './dishesRouter.mjs';
import categorysRouter from './categorysRouter.mjs';
import cartsRouter from './cartsRouter.mjs';
import employeesRouter from './employeesRouter.mjs';
import adminAuthRouter from './adminAuthRouter.mjs';


function routes(app) {
  app.use('/api/auth', authRouter);
  app.use('/api/auth/admin', adminAuthRouter);
  app.use('/api/dishes', dishesRouter);
  app.use('/api/category', categorysRouter);
  app.use('/api/cart', cartsRouter);
  app.use('/api/employee', employeesRouter);
}

export default routes;
