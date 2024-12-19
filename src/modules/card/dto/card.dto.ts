import { Type } from 'class-transformer';
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    MaxLength,
    Min,
    Validate,
} from 'class-validator';
import {
    PaginationDto,
    PaginationMetadataDto,
} from 'src/common/dto/pagination.dto';
import { IsIBAN } from 'src/common/validators/iban';
import { Card } from '../entities/card.entity';

export class CreateCardDto {
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    contactId: number;

    @IsString()
    @IsNotEmpty()
    @Length(16, 16)
    cardNo: string;

    @IsString()
    @IsOptional()
    @Validate(IsIBAN)
    iban: string;

    @IsString()
    @IsOptional()
    @MaxLength(2000)
    note: string;
}

export class UpdateCardDto extends CreateCardDto {}

export class FindAllCardsQueryDto extends PaginationDto {
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    @Type(() => Number)
    contactId: number;

    @IsOptional()
    @IsString()
    search: string;
}

export class FindAllCardsResponseDto extends PaginationMetadataDto {
    items: Pick<Card, 'cardNo' | 'iban' | 'note'>[];
}

export class DeleteCardQueryDto {
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    contactId: number;
}
