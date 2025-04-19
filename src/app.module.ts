import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { WebSocketModule } from './shared/lib/socket/websocket.module';

@Module({
  imports: [AuthModule, WebSocketModule],
})
export class AppModule {}
