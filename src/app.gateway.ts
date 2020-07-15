import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Logger } from '@nestjs/common';
 import { Socket, Server } from 'socket.io';

 @WebSocketGateway()
 export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
 
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
  
    console.log("payload",payload);
    this.server.emit('msgToClient', payload);
  }
 
  afterInit(server: Server) {
    this.logger.log('Initialized');
  }
 
  handleDisconnect(client: Socket) {
   this.logger.log(`Client disconnected: ${client.id}`);
  }
 
  handleConnection(client: Socket, ...args: any[]) {
 
    this.logger.log(`Client connected: ${client.id}`);
  
  }

 getHistoric(client: Socket){
    const msg= {
      userId: '333', text: 'iu', jobId: 'eee', userType: 'customer'
    }

    console.log("payload22",msg);
      this.server.emit('historic', msg);
  }






 }