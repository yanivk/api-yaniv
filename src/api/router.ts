import { Router } from 'express';
import indexRouter from "./index";
import userRouter from "./users";
import projectsRouter from "./projects";
import skillsRouter from "./skills"
import formationsRouter from "./formations"
import blogsRouter from "./blogs"

const router = Router();

router.use('/', indexRouter);
router.use('/users', userRouter);
router.use('/projects', projectsRouter);
router.use('/skills', skillsRouter);
router.use('/formations', formationsRouter)
router.use('/blogs', blogsRouter)

export default router
