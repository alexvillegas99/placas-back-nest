import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Headers,
  Logger,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesBuilder, InjectRolesBuilder } from 'nest-access-control';
import { AppResource, AppRoles } from 'src/app.roles';
import { User as UserEntity } from './entities';
import { UsersService } from './users.service';
import { Auth, User } from 'src/common/helpers/decorators';
import { CreateUserDto, UpdateUserDto, UserRegistrationDto } from './dto';
import { Request } from 'express';
@ApiTags('Usuarios')
@Controller('user')
export class UsersController {
  logger = new Logger(UsersController.name);
  constructor(
    private readonly userService: UsersService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Get()
  async getMany() {
    this.logger.log('Obteniendo todos los usuarios ');
    const data = await this.userService.getMany();
    return  data ;
  }

  @Get('/userSeed')
  async UserSeed() {
    const newUser: CreateUserDto = {
      name: 'Admin',
      username: 'admintransito',
      password: '12345678',
      roles: ['ADMIN'],
    };
    const data = await this.userService.createOne(newUser);
    return { message: 'User created', data };
  }


  @Post('register')
  async publicRegistration(@Body() dto: UserRegistrationDto) {
    this.logger.log('Registrando usuario publico ');
    const data = await this.userService.createOne({
      ...dto,
      roles: [AppRoles.USER],
    });
    return { message: 'User registered', data };
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    this.logger.log(`Obteniendo usuario: ${id}`);
    const data = await this.userService.getOne(id);
    return { data };
  }
  @ApiBearerAuth()
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER,
  })
  @Post()
  async createOne(@Body() dto: CreateUserDto, @User() user: UserEntity) {
    this.logger.log(`Creando usuario con el administrador: ${user.username}`);

    const data = await this.userService.createOne(dto);
    return { message: 'User created', data };
  }


  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
    @User() user: UserEntity,
  ) {
    this.logger.log(`Actualizando usuario: ${id}`);
    let data;
      // esto es un author
      const { roles, ...rest } = dto;
      data = await this.userService.editOne(id, rest);
    
    return { message: 'Usuario editado', data };
  }

  @Auth({
    action: 'delete',
    possession: 'own',
    resource: AppResource.USER,
  })
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @User() user: UserEntity) {
    this.logger.log(`Eliminando usuario: ${id}`);
    let data;

    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      // esto es un admin
      data = await this.userService.deleteOne(id);
    } else {
      // esto es un author
      data = await this.userService.deleteOne(id, user);
    }
    return { message: 'Usuario eliminado', data };
  }


}
