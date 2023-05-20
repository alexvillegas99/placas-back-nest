import { ConflictException } from '@nestjs/common';
import { Plate } from 'src/plate/entities/plate.entity';
import { User } from 'src/users/entities';
import {
    BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('certificates')
export class Certificate  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  number: number;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'varchar', length: 150 })
  detail: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 13 })
  identification: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;



  @ManyToOne((_) => User, (user) => user.certificate)
  user: User;

  @OneToOne(() => Plate)
  @JoinColumn()
  plate: Plate;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;



}
