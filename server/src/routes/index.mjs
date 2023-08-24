import authRouter from './authRouter.mjs';
import todosRouter from './todosRouter.mjs';
import userRouter from './userRouter.mjs';
import labelRouter from './labelRouter.mjs';
import adminRouter from './adminRouter.mjs';

function routes(app) {
  app.use('/api/auth', authRouter);
  app.use('/api/todos', todosRouter);
  app.use('/api/user', userRouter);
  app.use('/api/label', labelRouter);
  app.use('/api/admin', adminRouter);
}

export default routes;
