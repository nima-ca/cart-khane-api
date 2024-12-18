import { CoreEntity } from 'src/modules/shared/entities/core';
import { User } from 'src/modules/user/entities/uesr.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum CardType {
    Myself = 'MySelf',
    Others = 'Others',
}

@Entity('cards')
export class Card extends CoreEntity {
    @Column({ length: 16 })
    digits: string;

    @Column({ length: 100 })
    holderName: string;

    @Column({ length: 320, default: '' })
    holderEmail: string;

    @Column({ length: 15, default: '' })
    holderPhoneNumber: string;

    @Column({ length: 2000, default: '' })
    note: string;

    @Column({ type: 'enum', enum: CardType })
    cardType: CardType;

    @ManyToOne(() => User, (user) => user.cards)
    user: User;
}
