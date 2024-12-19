import { IsOptional, IsString } from 'class-validator';
import {
    PaginationDto,
    PaginationMetadataDto,
} from 'src/common/dto/pagination.dto';
import { Contact } from '../entities/contact.entity';

export class FindAllContactsQueryDto extends PaginationDto {
    @IsOptional()
    @IsString()
    search: string;
}

export class FindAllContactsResponseDto extends PaginationMetadataDto {
    items: Partial<Contact[]>;
}
