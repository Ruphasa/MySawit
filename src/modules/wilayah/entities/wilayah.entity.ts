import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { LaporanHarian } from '../../laporan/entities/laporan.entity';

@Entity('wilayah')
export class Wilayah {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nama_wilayah!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  luas_hektar!: number;

  @Column({ nullable: true })
  lokasi!: string;

  @CreateDateColumn()
  created_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @OneToMany(() => LaporanHarian, (laporan) => laporan.wilayah)
  laporan_harian!: LaporanHarian[];
}
