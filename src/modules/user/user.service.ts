import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DUPLICATE_KEY_ERROR_NO } from 'src/constants/errors';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/uesr.entity';

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

    async updateOTPSentTime(userId: number) {
        await this.usersRepository.update(
            { id: userId },
            { otpSent: new Date() },
        );
    }
}
