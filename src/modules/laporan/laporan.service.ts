import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LaporanHarian } from './entities/laporan.entity';

@Injectable()
export class LaporanHarianService {
  constructor(
    @InjectRepository(LaporanHarian)
    private laporanRepository: Repository<LaporanHarian>,
  ) {}

  async findAll(): Promise<LaporanHarian[]> {
    return this.laporanRepository.find({
      relations: ['wilayah'],
      order: { tanggal: 'DESC' },
    });
  }

  async findOne(id: number): Promise<LaporanHarian | null> {
    return this.laporanRepository.findOne({
      where: { id },
      relations: ['wilayah'],
    });
  }

  async create(data: any): Promise<LaporanHarian> {
    const laporan = this.laporanRepository.create(data as object);
    return this.laporanRepository.save(laporan);
  }

  async update(id: number, data: any): Promise<void> {
    await this.laporanRepository.update(id, data as object);
  }

  async remove(id: number): Promise<void> {
    await this.laporanRepository.softDelete(id);
  }
}
