import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateContactDto } from './dto/create-contact.dto';
import {
    FindAllContactsQueryDto,
    FindAllContactsResponseDto,
} from './dto/find-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
        private readonly userService: UserService,
    ) {}

    async create(dto: CreateContactDto, userId: number): Promise<Contact> {
        const user = await this.userService.validateUserExistence(userId);
        return this.contactRepository.save(
            this.contactRepository.create({ ...dto, user }),
        );
    }

    async findAll(
        userId: number,
        { limit, page, search }: FindAllContactsQueryDto,
    ): Promise<FindAllContactsResponseDto> {
        const user = await this.userService.validateUserExistence(userId);
        const qb = this.contactRepository.createQueryBuilder('contact');

        // Add condition for user ID
        qb.where('contact.userId = :userId', { userId: user.id });

        // Check if a search term is provided
        if (search) {
            qb.andWhere(
                'contact.name ILIKE :search OR contact.phoneNumber ILIKE :search OR contact.email ILIKE :search',
                { search: `%${search}%` },
            );
        }

        // Apply pagination
        qb.skip((page - 1) * limit).take(limit);

        // Get results and total count
        const [contacts, total] = await qb.getManyAndCount();

        return {
            items: contacts,
            metadata: {
                limit,
                page,
                totalCount: total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: number, userId: number): Promise<Contact> {
        const user = await this.userService.validateUserExistence(userId);
        const contact = await this.contactRepository.findOne({
            where: { id, user: { id: user.id } },
        });

        if (!contact) {
            throw new NotFoundException('مخاطب یافت نشد');
        }

        return contact;
    }

    async delete(id: number, userId: number) {
        const contact = await this.findOne(id, userId);
        return this.contactRepository.remove(contact);
    }

    async update(id: number, userId: number, dto: UpdateContactDto) {
        const contact = await this.findOne(id, userId);
        return this.contactRepository.update({ id: contact.id }, dto);
    }
}
