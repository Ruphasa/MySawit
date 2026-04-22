import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Redirect,
} from '@nestjs/common';
import { LaporanHarianService } from './laporan.service';
import { WilayahService } from '../wilayah/wilayah.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { View } from '../../common/decorators/view.decorator';

@UseGuards(AuthenticatedGuard)
@Controller('laporan')
export class LaporanController {
  constructor(
    private readonly laporanService: LaporanHarianService,
    private readonly wilayahService: WilayahService,
  ) { }

  @Get()
  @View('laporan/index')
  async findAll() {
    const data = await this.laporanService.findAll();
    return { laporan: data, title: 'Laporan Panen - My Sawit' };
  }

  @Get('create')
  @View('laporan/form')
  async createForm() {
    const wilayah = await this.wilayahService.findAll();
    return { wilayah, title: 'Tambah Laporan Panen' };
  }

  @Post()
  async create(@Body() data: any) {
    await this.laporanService.create(data);
    return { redirect: '/laporan' };
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string) {
    await this.laporanService.remove(+id);
    return { redirect: '/laporan' };
  }
}
