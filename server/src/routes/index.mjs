import authRouter from './authRouter.mjs';
import productsRouter from './productsRouter.mjs';
import categorysRouter from './categorysRouter.mjs';
import cartsRouter from './cartsRouter.mjs';
import employeesRouter from './employeesRouter.mjs';
import adminAuthRouter from './adminAuthRouter.mjs';
import userRouter from './usersRouter.mjs';


function routes(app) {
  app.use('/api/auth', authRouter);
  app.use('/api/auth/admin', adminAuthRouter);
  app.use('/api/products', productsRouter);
  app.use('/api/category', categorysRouter);
  app.use('/api/cart', cartsRouter);
  app.use('/api/employee', employeesRouter);
  app.use('/api/user', userRouter);
}

export default routes;
