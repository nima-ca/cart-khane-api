import {
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class CoreEntity extends BaseEntity {
    @PrimaryGeneratedColumn() // Automatically generates an id
    id: number;

    @CreateDateColumn() // Automatically set when the record is created
    createdAt: Date;

    @UpdateDateColumn() // Automatically updated when the record is modified
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true }) // Tracks when the record is soft-deleted
    deletedAt?: Date;
}
