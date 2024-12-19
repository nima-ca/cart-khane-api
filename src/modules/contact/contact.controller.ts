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
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { FindAllContactsQueryDto } from './dto/find-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Post()
    async create(
        @Body() dto: CreateContactDto,
        @AuthUser() user: UserJWTPayload,
    ) {
        const contact = await this.contactService.create(dto, user.sub);
        return { id: contact.id };
    }

    @Get()
    async findAll(
        @AuthUser() user: UserJWTPayload,
        @Query() dto: FindAllContactsQueryDto,
    ) {
        return await this.contactService.findAll(user.sub, dto);
    }

    @Get('/:id')
    async findOne(@Param('id') id: number, @AuthUser() user: UserJWTPayload) {
        return await this.contactService.findOne(+id, user.sub);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @AuthUser() user: UserJWTPayload) {
        await this.contactService.delete(+id, user.sub);
    }

    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateContactDto,
        @AuthUser() user: UserJWTPayload,
    ) {
        await this.contactService.update(+id, user.sub, dto);
    }
}
