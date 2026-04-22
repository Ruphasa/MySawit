import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaporanHarian } from './entities/laporan.entity';
import { LaporanHarianService } from './laporan.service';
import { LaporanController } from './laporan.controller';
import { WilayahModule } from '../wilayah/wilayah.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LaporanHarian]),
    WilayahModule,
    AuthModule,
  ],
  providers: [LaporanHarianService],
  controllers: [LaporanController],
})
export class LaporanModule {}
