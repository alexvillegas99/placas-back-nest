import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { PlateService } from './plate.service';
import { CreatePlateDto } from './dto/create-plate.dto';
import { UpdatePlateDto } from './dto/update-plate.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from 'src/common/helpers/decorators';
import { AppResource } from 'src/app.roles';
import { User as UserEntity } from 'src/users/entities';
import { PlateReportDto } from './dto/plate-report.dto';

@ApiTags('Placas')
@Controller('plate')
export class PlateController {
  logger = new Logger(PlateController.name);
  constructor(private readonly plateService: PlateService) {}

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.PLATE,
  })
  @Post()
  create(@Body() createPlateDto: CreatePlateDto, @User() user: UserEntity) {
    this.logger.log(`Creando nueva placa`);
    const id = user.id;
    return this.plateService.create({ ...createPlateDto, user: id });
  }

  @Get()
  findAll() {
    this.logger.log(`Buscando placas`);
    return this.plateService.findAll();
  }

  @Get(':filter')
  find(@Param('filter') filter: string) {
    this.logger.log(`Buscando placa  ${filter}`);
    return this.plateService.find(filter.toLocaleLowerCase());
  }

  @Get('/buscar/:plate')
  findPlate(@Param('plate') plate: string) {
    this.logger.log(`Buscando placa  ${plate}`);
    return this.plateService.findPlate(plate.toLocaleLowerCase());
  }



  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResource.PLATE,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlateDto: UpdatePlateDto,
    @User() user: UserEntity,
  ) {
    const idUser = user.id;
    this.logger.log(`Actualizando placa ${id}`);
    return this.plateService.update(+id, { ...updatePlateDto, user: idUser });
  }
  @Auth({
    possession: 'any',
    action: 'delete',
    resource: AppResource.PLATE,
  })
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserEntity) {
    this.logger.log(`Eliminando placa ${id}`);
    const idUser = user.id;
    return this.plateService.remove(+id, idUser);
  }
}
