import {
  ConflictException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import {
  And,
  FindOptionsWhere,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository
} from "typeorm";
import { isDate } from "class-validator";
import { PaginationDto } from "./dto/pagination.dto";
import { ProfileDto } from "./dto/profile.dto";
import { ProfileEntity } from "./entities/profile.entity";

@Injectable()
export class UserBuilderService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>
  ) {
  }


  async findAll(search: string) {
    const where: FindOptionsWhere<UserEntity> = {};
    if (search && isDate(new Date(search))) {
      let date = new Date(search);
      let statedAt = new Date(date.setUTCHours(0, 0, 0));
      let finishedAt = new Date(date.setUTCHours(23, 59, 59));

      // where["firstName"] = search;
      where["createdAt"] = And(
        MoreThanOrEqual(statedAt),
        LessThanOrEqual(finishedAt)
      );
    }
    return await this.userRepository.createQueryBuilder("user").where(where).getMany();
  }

  async orderData() {
    return await this.userRepository.createQueryBuilder("user").orderBy("user.age", "DESC").getMany();
  }

  async pagination(paginationDto: PaginationDto) {
    let { page = 0, limit = 5 } = paginationDto;
    if (!page || page <= 0) page = 0;
    else page = page - 1;
    if (!limit || limit <= 0) limit = 5;
    const skip = page * limit;
    console.log(page, limit, skip);
    return await this.userRepository.createQueryBuilder("user").orderBy("user.id", "ASC")
      .take(limit).skip(skip).getMany();
  }

  async selection() {
    return await this.userRepository.createQueryBuilder("user").select(["firstName", "lastName", "email"]).getMany();
  }

  async findOne(id: number) {
    const user = await this.userRepository.createQueryBuilder("user").where({ id }).getOne();
    if (!user) throw new NotFoundException("کاربر یافت نشد.");
    return user;
  }

  async findUserWithProfile(id: number) {
    const user = await this.userRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.profile", "profile").getOne();
    if (!user) throw new NotFoundException("کاربر یافت نشد.");
    return user;
  }

  async blogOfUser(userId: number) {
    return await this.userRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.blogs", "blogs").where({ id: userId }).getOne();
  }


  async exists(email: string) {
    let user = await this.userRepository.findOneBy({ email });
    if (user) throw new ConflictException("ارباب ایمیل تکراری هست");
    // return true;
  }
}
