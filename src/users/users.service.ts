import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';

export interface UserFindOne {
  id?: number;
  username?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMany() {
    return await this.userRepository.find({ where: { isActive: true } });
  }

  async getOne(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOne({ where: { id, isActive: true } })
      .then((u) =>
        !userEntity ? u : !!u && userEntity.id === u.id ? u : null,
      );

    if (!user)
      throw new NotFoundException('El usuario no esta autorizado');

    return user;
  }

  async createOne(dto: CreateUserDto) {
    const username = dto.username;
    const userExist = await this.userRepository.findOne({
      where: { username },
    });
    if (userExist)
      throw new ConflictException('El nombre de usuario ya existe');

    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async editOne(id: number, dto: UpdateUserDto, userEntity?: User) {
    console.log(dto);
    const user = await this.getOne(id, userEntity);
    const editedUser = Object.assign(user, dto);
    return await this.userRepository.save(editedUser);
  }

  async deleteOne(id: number, userEntity?: User) {
    const user = await this.getOne(id, userEntity);
    user.isActive = false;
    return await this.userRepository.save(user);
  }

  async findOne(data: UserFindOne) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
}
