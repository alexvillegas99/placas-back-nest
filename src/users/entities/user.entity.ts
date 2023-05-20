import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Entity,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { Plate } from 'src/plate/entities/plate.entity';
import { Certificate } from 'src/certificates/entities/certificate.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default: '', nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 128, nullable: false, select: false })
  password: string;

  @Column({ type: 'simple-array' })
  roles: string[];

  @OneToMany((_) => Plate, (plate) => plate.user)
  plate: Plate;

  @OneToMany((_) => Certificate, (Certificate) => Certificate.user)
  certificate: Certificate;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  /*   @OneToMany(() => Plate, plate => plate.user)
  plates: Plate[]; */

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}
