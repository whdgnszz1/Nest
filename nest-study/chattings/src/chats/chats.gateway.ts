import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
// 서버에서 작성할 로직들: gateway로 로직을 작성
@WebSocketGateway()
export class ChatsGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
