import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { WebSocketModule } from './shared/lib/socket/websocket.module';
import { BankingAccountModule } from './module/banking_card/banking_card.module';

@Module({
  imports: [AuthModule, WebSocketModule, BankingAccountModule],
})
export class AppModule {}
