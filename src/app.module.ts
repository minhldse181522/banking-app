import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { WebSocketModule } from './shared/lib/socket/websocket.module';
import { BankingAccountModule } from './module/banking_card/banking_card.module';
import { CurrencyModule } from './module/currency/currency.module';

@Module({
  imports: [AuthModule, WebSocketModule, BankingAccountModule, CurrencyModule],
})
export class AppModule {}
