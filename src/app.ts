import createError from 'http-errors';
import type { ErrorRequestHandler } from "express";
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {Express} from "express/ts4.0";
import router from "./api/router";
import cors from "cors";
import fileUpload from "express-fileupload";
import * as http from "http";

const app: Express = express();

const port = process.env.PORT || '80';
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));
app.use(fileUpload({
  createParentPath: true
}))
app.use(cors({
  origin: "*"
}))
app.enable('trust proxy');
app.use(router);

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});

const errorHandler: ErrorRequestHandler = (err, req, res) => {
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

