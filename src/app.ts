import createError from 'http-errors';
import type { ErrorRequestHandler } from "express";
import express from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './api';
import usersRouter from './api/users';
import projectsRouter from './api/projects';
import { Express } from "express";
import * as http from "http";

const app: Express = express();

const port = process.env.PORT || '3000';
app.set('port', port);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
}

// error handler
app.use(errorHandler) ;

const server = http.createServer(app);
server.listen(port);

export default app

