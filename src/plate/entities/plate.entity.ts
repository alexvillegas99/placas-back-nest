import { BadRequestException, ConflictException } from '@nestjs/common';
import { validate } from 'class-validator';
import { Certificate } from 'src/certificates/entities/certificate.entity';
import { PlateTypes as PlateType } from 'src/common/helpers/emuns/plate.emun';
import { VehicleType } from 'src/common/helpers/emuns/vehicle.emun';
import { User } from 'src/users/entities';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Entity,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Index,
  BaseEntity,
  AfterInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('plate')
export class Plate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: 'varchar', length: 15, default: '' })
  plate: string;

  @Column({ type: 'enum', enum: PlateType })
  plate_type: string;

  @Column({ type: 'enum', enum: VehicleType })
  vehicle_type: string;

  @Column({ type: 'bool', default: false })
  status: boolean;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @ManyToOne((_) => User, (user) => user.plate)
  user: User;

 @OneToOne(() => Certificate, certificate => certificate.plate)
  certificate: Certificate;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})

  updatedAt: Date;

  @BeforeInsert()
  async validatePlate() {
    const existingPlate = await Plate.findOne({
      where: { plate: this.plate, isActive:true },
    });

    if (existingPlate) {
      throw new ConflictException('La placa ya existe');
    }
  } 
}
