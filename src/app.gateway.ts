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
import { Message } from './chat/message';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  msgs: Message[] = [
    {
      userId: '11',
      text: 'Hail mary, come with me',
      jobId: 'eee',
      userType: 'customer',
      read: false,
    },
    {
      userId: '222',
      text: 'Hail ma4ry, come with me',
      jobId: 'aaa',
      userType: 'customer',
      read: false,
    },
    {
      userId: '11',
      text: 'Hail mary, come with me',
      jobId: 'eee',
      userType: 'customer',
      read: false,
    },
    {
      userId: '222',
      text: 'Hail mary, come with me',
      jobId: 'eee',
      userType: 'customer',
      read: false,
    },
  ];

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: Message): void {
    this.saveMessageOnDb(payload);
    this.server.emit('msgToClient', payload);
  }
  saveMessageOnDb(payload: Message) {
    this.msgs.push(payload);
  }

  findMessageByJobId(jobId: string): Message[] {
    return this.msgs.filter(current => {
      return current.jobId === jobId;
    });
  }

  @SubscribeMessage('getHistorical')
  handleHistorical(client: Socket, jobId: string): void {
    client.emit('historicalChat', this.findMessageByJobId(jobId));
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
}
