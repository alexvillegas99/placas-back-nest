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
    return await this.userRepository.find();
  }

  async getOne(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOne({ where: { id, isActive: true } })
      .then((u) =>
        !userEntity ? u : !!u && userEntity.id === u.id ? u : null,
      );

    if (!user) throw new NotFoundException('El usuario no esta autorizado');

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

  async editOne(id: number, dto: UpdateUserDto) {
    console.log(id);
    console.log(dto);
    const user = await this.userRepository.find({where:{id:id}});
    user[0].isActive = dto.isActive;
    console.log('ss');
    return await this.userRepository.save(user[0]);
  }

  async deleteOne(id: number, userEntity?: User) {
    console.log('sss');
    const user = await this.getOne(id, userEntity);
    console.log(user);
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
