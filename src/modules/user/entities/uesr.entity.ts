import { Contact } from 'src/modules/contact/entities/contact.entity';
import { CoreEntity } from 'src/modules/shared/entities/core';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends CoreEntity {
    @Column({ length: 100, nullable: true })
    firstName?: string;

    @Column({ length: 100, nullable: true })
    lastName?: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column({ length: 6, nullable: true })
    otp?: string;

    @Column({ nullable: true })
    otpSent?: Date;

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[];
}
