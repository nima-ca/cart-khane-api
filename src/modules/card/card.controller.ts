import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { UserJWTPayload } from '../auth/interface/jwt.interface';
import { CardService } from './card.service';
import {
    CreateCardDto,
    DeleteCardQueryDto,
    FindAllCardsQueryDto,
    UpdateCardDto,
} from './dto/card.dto';

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post()
    async create(@Body() dto: CreateCardDto, @AuthUser() user: UserJWTPayload) {
        const card = await this.cardService.create(dto, user.sub);
        return { id: card.id };
    }

    @Get()
    async findAll(
        @AuthUser() user: UserJWTPayload,
        @Query() dto: FindAllCardsQueryDto,
    ) {
        return await this.cardService.findAll(user.sub, dto);
    }

    @Delete('/:id')
    async delete(
        @Param('id') id: number,
        @AuthUser() user: UserJWTPayload,
        @Query() dto: DeleteCardQueryDto,
    ) {
        await this.cardService.delete(+id, user.sub, dto);
    }

    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateCardDto,
        @AuthUser() user: UserJWTPayload,
    ) {
        await this.cardService.update(+id, user.sub, dto);
    }
}
