import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DUPLICATE_KEY_ERROR_NO } from 'src/constants/errors';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserInfoDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(user: CreateUserDto): Promise<User | null> {
        try {
            return await this.usersRepository.save(
                this.usersRepository.create(user),
            );
        } catch (error) {
            if (error.code === DUPLICATE_KEY_ERROR_NO) {
                throw new BadRequestException('شماره همراه قبلا ثبت شده است');
            }

            throw new InternalServerErrorException();
        }
    }

    async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
        return (await this.usersRepository.findOneBy({ phoneNumber })) ?? null;
    }

    async findById(id: number): Promise<User | null> {
        return (await this.usersRepository.findOneBy({ id })) ?? null;
    }

    async updateInfo(userId: number, dto: UpdateUserInfoDto) {
        const user = await this.validateUserExistence(userId);
        await this.usersRepository.update({ id: user.id }, dto);
    }

    async deleteUser(userId: number) {
        const user = await this.findById(userId);

        if (!user) {
            throw new NotFoundException('کاربر یافت نشد');
        }

        await this.usersRepository.remove(user);
    }

    async validateUserExistence(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new UnauthorizedException('invalid token');
        }

        return user;
    }

    async updateOTP(
        userId: number,
        otp: string,
        shouldUpdateSentTime: boolean,
    ) {
        await this.usersRepository.update(
            { id: userId },
            { otp, ...(shouldUpdateSentTime && { otpSent: new Date() }) },
        );
    }
}
