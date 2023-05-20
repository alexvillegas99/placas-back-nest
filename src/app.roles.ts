import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum AppResource {
  USER = 'USER',
  PLATE = 'PLATE',
  CERTIFICATES = 'CERTIFICATES',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // USER ROLES
  .grant(AppRoles.USER)
  .updateAny([AppResource.PLATE, AppResource.CERTIFICATES])
  .createAny([AppResource.PLATE, AppResource.CERTIFICATES])

  // ADMIN ROLES
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.USER)
  .createAny([AppResource.USER])
  .updateAny([AppResource.USER])
  .deleteAny([AppResource.USER, AppResource.PLATE, AppResource.CERTIFICATES]);
