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
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
} from "./interfaces/socket.io"

const app: Express = express();
console.log(process.env.PORT)
const port = process.env.PORT || '3000';
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
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }});

io.on('connection', (socket: any) => {
  console.log('user connected')
  // @ts-ignore
  socket.on('writeInColumn', ({column, player}) => {
    io.emit('writeInColumn', {column, player})
    console.log({column, player})
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})
server.listen(port, () => {
  console.log('A server listen on port ' + port)
});

export default app

