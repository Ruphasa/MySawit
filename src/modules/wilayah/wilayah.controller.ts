import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Redirect,
  NotFoundException,
} from '@nestjs/common';
import { WilayahService } from './wilayah.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { View } from '../../common/decorators/view.decorator';

@UseGuards(AuthenticatedGuard)
@Controller('wilayah')
export class WilayahController {
  constructor(private readonly wilayahService: WilayahService) { }

  @Get()
  @View('wilayah/index')
  async findAll(@Query('search') search: string) {
    const data = await this.wilayahService.findAll(search);
    return { wilayah: data, search, title: 'Data Wilayah - My Sawit' };
  }

  @Get('create')
  @View('wilayah/form')
  async createForm() {
    return { title: 'Tambah Wilayah - My Sawit', isEdit: false };
  }

  @Post()
  async create(@Body() data: any) {
    await this.wilayahService.create(data);
    return { redirect: '/wilayah' };
  }

  @Get(':id')
  @View('wilayah/detail')
  async findOne(@Param('id') id: string) {
    const data = await this.wilayahService.findOne(+id);
    if (!data) {
      throw new NotFoundException('Wilayah tidak ditemukan');
    }
    return { item: data, title: `Detail ${data.nama_wilayah}` };
  }

  @Get(':id/edit')
  @View('wilayah/form')
  async editForm(@Param('id') id: string) {
    const data = await this.wilayahService.findOne(+id);
    if (!data) {
      throw new NotFoundException('Wilayah tidak ditemukan');
    }
    return { item: data, isEdit: true, title: 'Edit Wilayah' };
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    await this.wilayahService.update(+id, data);
    return { redirect: '/wilayah' };
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string) {
    await this.wilayahService.remove(+id);
    return { redirect: '/wilayah' };
  }
}
