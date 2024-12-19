import { PartialType } from '@nestjs/mapped-types';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    Matches,
    MaxLength,
} from 'class-validator';
import {
    PaginationDto,
    PaginationMetadataDto,
} from 'src/common/dto/pagination.dto';
import { IR_PHONE_NUMBER_REGEX } from 'src/utils/regex';
import { Card, CardType } from '../entities/card.entity';

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    @Length(16, 16)
    digits: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    holderName: string;

    @IsEmail()
    @IsString()
    @IsOptional()
    @MaxLength(320)
    holderEmail: string;

    @IsString()
    @IsOptional()
    @MaxLength(15)
    @Matches(IR_PHONE_NUMBER_REGEX, { message: 'invalid phone number format' })
    holderPhoneNumber: string;

    @IsString()
    @IsOptional()
    @MaxLength(2000)
    note: string;

    @IsNotEmpty()
    @IsEnum(CardType)
    cardType: CardType;
}

export class UpdateCardDto extends PartialType(CreateCardDto) {}

export class FindAllCardsQueryDto extends PaginationDto {
    @IsOptional()
    @IsString()
    search: string;

    @IsOptional()
    @IsEnum(CardType)
    cardType: CardType;
}

export class FindAllCardsResponseDto extends PaginationMetadataDto {
    items: Partial<Card[]>;
}
