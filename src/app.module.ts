import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlateModule } from './plate/plate.module';
import { CertificatesModule } from './certificates/certificates.module';
import configuration, {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from './config/config.env';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { Plate } from './plate/entities/plate.entity';
import { PlateLogsModule } from './plate-logs/plate-logs.module';
import { CertificateLogsModule } from './certificate-logs/certificate-logs.module';
import { PlateLogs } from './plate-logs/entities/plate-log.entity';
import { LoginLogsModule } from './login-logs/login-logs.module';
import { RolesModule } from './roles/roles.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { PlateTypeModule } from './plate-type/plate-type.module';
import { VehicleType } from './vehicle-type/entities/vehicle-type.entity';
import { PlateType } from './plate-type/entities/plate-type.entity';
import { Roles } from './roles/entities/role.entity';
import { Certificate } from 'crypto';
import { CertificateLogs } from './certificate-logs/entities/ceretificate-log.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),

    TypeOrmModule.forRootAsync({
      useFactory: (configService) => ({
        type: 'mysql',
        host: configService.get(DATABASE_HOST),
        port: configService.get(DATABASE_PORT),
        username: configService.get(DATABASE_USERNAME),
        password: configService.get(DATABASE_PASSWORD),
        database: configService.get(DATABASE_NAME),
        entities: [
          User,
          Plate,
          PlateLogs,
          VehicleType,
          PlateType,
          Roles,
          Certificate,
          CertificateLogs,
        ],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AccessControlModule.forRoles(roles),
    AuthModule,
    PlateModule,
    CertificatesModule,
    PlateLogsModule,
    CertificateLogsModule,
    LoginLogsModule,
    RolesModule,
    VehicleTypeModule,
    PlateTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
