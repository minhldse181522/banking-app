import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrencyUseCase } from '../../application/use-cases/get-currency.usecase';
import { CurrencyEntity } from '../../domain/entity/currency.entity';
import { CurrencyResponseDto } from '../dto/response/currency.response.dto';

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly getCurrencyUseCase: GetCurrencyUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Đơn vị tiền tệ - Currency' })
  // @UseGuards(KeyCloakAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: CurrencyResponseDto,
  })
  getCurrency(): Promise<CurrencyEntity[]> {
    return this.getCurrencyUseCase.execute();
  }
}
