import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Wilayah } from '../../wilayah/entities/wilayah.entity';

@Entity('laporan_harian')
export class LaporanHarian {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  wilayah_id!: number;

  @Column({ type: 'date' })
  tanggal!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  jumlah_panen_ton!: number;

  @Column({ type: 'text', nullable: true })
  catatan!: string;

  @CreateDateColumn()
  created_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @ManyToOne(() => Wilayah, (wilayah) => wilayah.laporan_harian)
  @JoinColumn({ name: 'wilayah_id' })
  wilayah!: Wilayah;
}
