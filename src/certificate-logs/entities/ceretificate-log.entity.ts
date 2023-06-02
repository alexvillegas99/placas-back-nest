import { validate } from 'class-validator';
import { PayloadActions } from 'src/common/helpers/emuns/payload-actions.emun';
import { PlateTypes as PlateType } from 'src/common/helpers/emuns/plate.emun';
import { VehicleType } from 'src/common/helpers/emuns/vehicle.emun';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@Entity('certificate-logs')
export class CertificateLogs  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, default: '' })
  plate: string;

  @Column({ type: 'varchar', length: 150, default: '' })
  detail: string;

  @Column({ type: 'varchar', length: 150, default: '' })
  observation: string;

  @Column({ type: 'varchar', length: 13, default: '' })
  identification: string;

  @Column({ type: 'varchar', length: 15, default: '' })
  user: string;

  @Column({ type: 'enum', enum: PayloadActions })
  payload: string;
  
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;


}
