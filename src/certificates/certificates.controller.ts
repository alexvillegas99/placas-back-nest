import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, User } from 'src/common/helpers/decorators';
import { User as UserEntity } from 'src/users/entities';
import { AppResource } from 'src/app.roles';
@ApiTags('Certificados de entrega')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  
  @ApiBearerAuth()
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.CERTIFICATES,
  })
  @Post()
  create(
    @Body() createCertificateDto: CreateCertificateDto,
    @User() user: UserEntity,
  ) {
   
    return this.certificatesService.create({
      ...createCertificateDto,
      user: user.id,
    });
  }
  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.CERTIFICATES,
  })
  @Get()
  findAll() {
    return this.certificatesService.findAll();
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.CERTIFICATES,
  })
  @Get('/buscar/:filter')
  find(@Param('filter') filter: string) {
    return this.certificatesService.find(filter.toLocaleLowerCase());
  }

  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResource.CERTIFICATES,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {

    return this.certificatesService.update(+id, updateCertificateDto);
  }
  @Auth({
    possession: 'any',
    action: 'delete',
    resource: AppResource.CERTIFICATES,
  })
  @Delete(':id')
  remove(@Param('id') id: string,@User() user: UserEntity) {
    const idUser = user.id;
    return this.certificatesService.remove(+id,+idUser);
  }
}
