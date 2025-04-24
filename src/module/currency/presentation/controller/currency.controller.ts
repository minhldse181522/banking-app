import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { KeyCloakAuthGuard } from 'src/module/auth/presentation/guard/keycloak-auth.guard';
import { CreateCurrencyUseCase } from '../../application/use-cases/create-currency.usecase';
import { GetCurrencyUseCase } from '../../application/use-cases/get-currency.usecase';
import { CurrencyEntity } from '../../domain/entity/currency.entity';
import { CreateCurrencyRequestDto } from '../dto/request/currency.request.dto';
import { CurrencyResponseDto } from '../dto/response/currency.response.dto';
import { CreateCurrencyCommand } from '../../application/commands/create-currency.command';

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(
    private readonly getCurrencyUseCase: GetCurrencyUseCase,
    private readonly createCurrenyUseCase: CreateCurrencyUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Đơn vị tiền tệ - Currency' })
  @UseGuards(KeyCloakAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: CurrencyResponseDto,
  })
  getCurrency(): Promise<CurrencyEntity[]> {
    return this.getCurrencyUseCase.execute();
  }

  @Post('/create-currency')
  @ApiOperation({ summary: 'Tạo mới tiền tệ' })
  @UseGuards(KeyCloakAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CurrencyResponseDto,
    isArray: true,
  })
  createCurrency(
    @Body() body: CreateCurrencyRequestDto,
  ): Promise<CurrencyResponseDto[]> {
    const command = new CreateCurrencyCommand(
      body.code,
      body.name,
      body.rateToBase,
      body.createdBy,
    );
    return this.createCurrenyUseCase.execute(command);
  }
}
