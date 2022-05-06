import { Router } from 'express';
import indexRouter from "./index";
import userRouter from "./users";
import projectsRouter from "./projects";
import skillsRouter from "./skills"
import formationsRouter from "./formations"

const router = Router();

router.use('/', indexRouter);
router.use('/users', userRouter);
router.use('/projects', projectsRouter);
router.use('/skills', skillsRouter);
router.use('/formations', formationsRouter)

export default router
