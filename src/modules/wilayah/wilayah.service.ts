import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Wilayah } from './entities/wilayah.entity';

@Injectable()
export class WilayahService {
  constructor(
    @InjectRepository(Wilayah)
    private wilayahRepository: Repository<Wilayah>,
  ) {}

  async findAll(search?: string): Promise<Wilayah[]> {
    if (search) {
      return this.wilayahRepository.find({
        where: [
          { nama_wilayah: ILike(`%${search}%`) },
          { lokasi: ILike(`%${search}%`) },
        ],
        order: { created_at: 'DESC' },
      });
    }
    return this.wilayahRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Wilayah | null> {
    return this.wilayahRepository.findOne({
      where: { id },
      relations: ['laporan_harian'],
    });
  }

  create(data: Partial<Wilayah>): Promise<Wilayah> {
    const wilayah = this.wilayahRepository.create(data);
    return this.wilayahRepository.save(wilayah);
  }

  async update(id: number, data: Partial<Wilayah>): Promise<Wilayah | null> {
    await this.wilayahRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.wilayahRepository.softDelete(id);
  }
}
