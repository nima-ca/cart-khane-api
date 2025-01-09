import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactService } from '../contact/contact.service';
import { EncryptionService } from '../encryption/encryption.service';
import { UserService } from '../user/user.service';
import {
    CreateCardDto,
    DeleteCardQueryDto,
    FindAllCardsQueryDto,
    FindAllCardsResponseDto,
    UpdateCardDto,
} from './dto/card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Card)
        private cardsRepository: Repository<Card>,
        private readonly userService: UserService,
        private readonly contactService: ContactService,
        private readonly encryptionService: EncryptionService,
    ) {}

    async create(dto: CreateCardDto, userId: number): Promise<Card> {
        const user = await this.userService.validateUserExistence(userId);
        const contact = await this.contactService.findOne(
            dto.contactId,
            user.id,
        );

        return this.cardsRepository.save(
            this.cardsRepository.create({
                cardNo: this.encryptionService.encrypt(dto.cardNo ?? ''),
                iban: this.encryptionService.encrypt(dto.iban ?? ''),
                note: dto.note,
                contact,
            }),
        );
    }

    async findAll(
        userId: number,
        { limit, page, contactId }: FindAllCardsQueryDto,
    ): Promise<FindAllCardsResponseDto> {
        const user = await this.userService.validateUserExistence(userId);
        const contact = await this.contactService.findOne(contactId, user.id);

        const qb = this.cardsRepository.createQueryBuilder('card');

        // Add condition for user ID
        qb.where('card.contactId = :contactId', { contactId: contact.id });

        // Apply pagination
        qb.skip((page - 1) * limit).take(limit);

        // Get results and total count
        const [cards, total] = await qb.getManyAndCount();

        return {
            items: cards.map((c) => ({
                ...c,
                iban: this.encryptionService.decrypt(c.iban ?? ''),
                cardNo: this.encryptionService.decrypt(c.cardNo ?? ''),
            })),
            metadata: {
                limit,
                page,
                totalCount: total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(
        id: number,
        userId: number,
        contactId: number,
    ): Promise<Card | null> {
        const user = await this.userService.validateUserExistence(userId);
        const contact = await this.contactService.findOne(contactId, user.id);

        const card = await this.cardsRepository.findOne({
            where: { id, contact: { id: contact.id } },
        });

        if (!card) {
            throw new NotFoundException('کارت یافت نشد');
        }

        return card;
    }

    async delete(
        id: number,
        userId: number,
        { contactId }: DeleteCardQueryDto,
    ) {
        const card = await this.findOne(id, userId, contactId);
        return this.cardsRepository.remove(card);
    }

    async update(
        id: number,
        userId: number,
        { contactId, ...dto }: UpdateCardDto,
    ) {
        const card = await this.findOne(id, userId, contactId);
        return this.cardsRepository.update(
            { id: card.id },
            {
                cardNo: this.encryptionService.encrypt(dto.cardNo ?? ''),
                iban: this.encryptionService.encrypt(dto.iban ?? ''),
                note: dto.note,
            },
        );
    }
}
