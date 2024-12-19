import { Card } from 'src/modules/card/entities/card.entity';
import { CoreEntity } from 'src/modules/shared/entities/core';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('contacts')
export class Contact extends CoreEntity {
    @Column({ length: 100 })
    name: string;

    @Column({ length: 320, default: '' })
    email: string;

    @Column({ length: 15, default: '' })
    phoneNumber: string;

    @ManyToOne(() => User, (user) => user.contacts)
    user: User;

    @OneToMany(() => Card, (card) => card.contact, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    cards: Card[];
}
