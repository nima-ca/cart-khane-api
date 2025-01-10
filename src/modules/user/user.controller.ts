import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { UserJWTPayload } from '../auth/interface/jwt.interface';
import { UpdateUserInfoDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getInfo(@AuthUser() user: UserJWTPayload) {
        const userInfo = await this.userService.findById(user.sub);

        return {
            id: userInfo.id,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phoneNumber: userInfo.phoneNumber,
        };
    }

    @Patch()
    async update(
        @AuthUser() user: UserJWTPayload,
        @Body() dto: UpdateUserInfoDto,
    ) {
        return this.userService.updateInfo(user.sub, dto);
    }

    @Delete()
    async delete(@AuthUser() user: UserJWTPayload) {
        return this.userService.deleteUser(user.sub);
    }
}
