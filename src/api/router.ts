import { Router } from 'express';
import indexRouter from "./index";
import userRouter from "./users";
import projectsRouter from "./projects";
import skillsRouter from "./skills"
import formationsRouter from "./formations"
import blogsRouter from "./blogs"
import categoriesRouter from "./categories";
import experiencesRouter from "./experiences";

const router = Router();

router.use('/', indexRouter);
router.use('/users', userRouter);
router.use('/projects', projectsRouter);
router.use('/skills', skillsRouter);
router.use('/formations', formationsRouter)
router.use('/blogs', blogsRouter)
router.use('/categories', categoriesRouter)
router.use('/experiences', experiencesRouter)


/*Health route*/
router.get('health-check', (req, res) => {
  res.send("Health check it's good");
});
export default router
