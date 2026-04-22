import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wilayah } from './entities/wilayah.entity';
import { WilayahService } from './wilayah.service';
import { WilayahController } from './wilayah.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wilayah]), AuthModule],
  providers: [WilayahService],
  controllers: [WilayahController],
  exports: [WilayahService],
})
export class WilayahModule {}
