import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Tipos de vehículos')
@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @Post('/seed')
  create() {
    return this.vehicleTypeService.create(); 
  }

  @Get()
  findAll() {
    return this.vehicleTypeService.findAll();
  }

}
