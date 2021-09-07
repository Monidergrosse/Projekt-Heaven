//import {io as SocketIO} from "socket.io";
import { Server as SocketIO, Socket } from "socket.io";
import Express from 'express';
import Http from 'http';
import Client from './Client.mjs';

export default class Server {
  constructor(port) {
    return new Promise(async (resolve, reject) => {
      const io = await new SocketIO(Http.createServer(Express()), { cors: { origin: '*', serveClient: false, pingInterval: 10000, pingTimeout: 5000, cookie: false } }).listen(port);
      io.on('connection', (socket) => {
        let headers = { ...socket.handshake.query };
        delete (headers.EIO);
        delete (headers.t);
        delete (headers.transport);
        let client = new Client(socket);
        this._callEvent("connect", client, headers);
        socket.onAny((eventType, event, ...args) => {
          if (eventType == "Emit")
            this._callEvent(event, client, ...args);
        });
      });
      resolve(this);
    });
  }
  callbacks = {};
  on(event, cb) {
    this.callbacks[event] = this.callbacks[event] ? callbacks[event] : [];
    this.callbacks[event].push(cb);
  }
  off(event, cb) {
    if (cb) {
      if (this.callbacks[event])
        this.callbacks[event].pop(cb);
    } else
      this.callbacks[event] = undefined;
  }
  _callEvent(event, ...args) {
    if (this.callbacks[event])
      this.callbacks[event].forEach(cb => cb(...args));
  }
}