import { validate } from 'class-validator';
import { PayloadActions } from 'src/common/helpers/emuns/payload-actions.emun';
import { PlateTypes as PlateType } from 'src/common/helpers/emuns/plate.emun';
import { VehicleType } from 'src/common/helpers/emuns/vehicle.emun';
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
  Unique,
  BaseEntity,
} from 'typeorm';

@Entity('plate-logs')
export class PlateLogs  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, default: '' })
  plate: string;

  @Column({ type: 'enum', enum: PlateType })
  plate_type: string;

  @Column({ type: 'enum', enum: VehicleType })
  vehicle_type: string;

  @Column({ type: 'bool', default: false })
  status_plate: boolean;

  @Column({ type: 'enum', enum: PayloadActions })
  payload: string;

  @Column({ type: 'varchar', length: 15, default: '' })
  user: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;


}
