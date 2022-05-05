import { Router } from 'express';
import indexRouter from "./index";
import userRouter from "./users";
import projectsRouter from "./projects";

const router = Router();

router.use('/', indexRouter);
router.use('/users', userRouter);
router.use('/projects', projectsRouter);

export default router
