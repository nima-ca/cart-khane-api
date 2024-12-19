import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from '../contact/contact.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Card } from './entities/card.entity';

@Module({
    imports: [ContactModule, TypeOrmModule.forFeature([Card])],
    controllers: [CardController],
    providers: [CardService],
})
export class CardModule {}
