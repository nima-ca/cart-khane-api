import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import {
    CreateCardDto,
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
    ) {}

    async create(dto: CreateCardDto, userId: number): Promise<Card> {
        const user = await this.userService.validateUserExistence(userId);
        return this.cardsRepository.save(
            this.cardsRepository.create({ ...dto, user }),
        );
    }

    async findAll(
        userId: number,
        { limit, page, search, cardType }: FindAllCardsQueryDto,
    ): Promise<FindAllCardsResponseDto> {
        const user = await this.userService.validateUserExistence(userId);
        const qb = this.cardsRepository.createQueryBuilder('card');

        // Add condition for user ID
        qb.where('card.userId = :userId', { userId: user.id });

        // Check if a search term is provided
        if (search) {
            qb.andWhere(
                'card.digits ILIKE :search OR card.holderName ILIKE :search OR card.holderPhoneNumber ILIKE :search OR card.holderEmail ILIKE :search',
                { search: `%${search}%` },
            );
        }

        // Check if a card type is provided
        if (cardType) {
            qb.andWhere('card.cardType = :type', { type: cardType });
        }

        // Apply pagination
        qb.skip((page - 1) * limit).take(limit);

        // Get results and total count
        const [cards, total] = await qb.getManyAndCount();

        return {
            items: cards,
            metadata: {
                limit,
                page,
                totalCount: total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: number, userId: number): Promise<Card | null> {
        const user = await this.userService.validateUserExistence(userId);
        const card = await this.cardsRepository.findOne({
            where: { id, user: { id: user.id } },
        });

        if (!card) {
            throw new NotFoundException();
        }

        return card;
    }

    async delete(id: number, userId: number) {
        console.log(id, userId);
        const card = await this.findOne(id, userId);
        return this.cardsRepository.remove(card);
    }

    async update(id: number, userId: number, dto: UpdateCardDto) {
        const card = await this.findOne(id, userId);
        return this.cardsRepository.update({ id: card.id }, dto);
    }
}
