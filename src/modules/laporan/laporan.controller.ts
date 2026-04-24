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
    return { wilayah, title: 'Tambah Laporan Panen', isEdit: false };
  }

  @Post()
  async create(@Body() data: any) {
    await this.laporanService.create(data);
    return { redirect: '/laporan' };
  }

  @Get(':id')
  @View('laporan/detail')
  async findOne(@Param('id') id: string) {
    const data = await this.laporanService.findOne(+id);
    if (!data) {
      throw new Error('Laporan tidak ditemukan');
    }
    return { item: data, title: `Detail Laporan - ${data.tanggal}` };
  }

  @Get(':id/edit')
  @View('laporan/form')
  async editForm(@Param('id') id: string) {
    const data = await this.laporanService.findOne(+id);
    const wilayah = await this.wilayahService.findAll();
    return {
      item: data,
      wilayah,
      isEdit: true,
      title: 'Edit Laporan Panen',
    };
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    await this.laporanService.update(+id, data);
    return { redirect: '/laporan' };
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string) {
    await this.laporanService.remove(+id);
    return { redirect: '/laporan' };
  }
}
