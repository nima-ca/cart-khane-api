import { Contact } from 'src/modules/contact/entities/contact.entity';
import { CoreEntity } from 'src/modules/shared/entities/core';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('cards')
export class Card extends CoreEntity {
    @Column({ nullable: true })
    cardNo?: string;

    @Column({ nullable: true })
    iban?: string;

    @Column({ length: 2000, default: '' })
    note: string;

    @ManyToOne(() => Contact, (contact) => contact.cards)
    contact: Contact;
}
