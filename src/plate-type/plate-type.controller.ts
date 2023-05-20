import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlateTypeService } from './plate-type.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Tipos de placas')
@Controller('plate-type')
export class PlateTypeController {
  constructor(private readonly plateTypeService: PlateTypeService) {}

  @Post('/seed')
  create() {
    return this.plateTypeService.create();
  }

  @Get()
  findAll() {
    return this.plateTypeService.findAll();
  }

}
