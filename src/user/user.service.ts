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
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName, age, email } = createUserDto;
    await this.exists(createUserDto.email);
    const user = this.userRepository.create({
      firstName,
      lastName,
      age,
      email
    });
    return await this.userRepository.save(user);
  }

  async insert(createUserDto: CreateUserDto) {
    await this.exists(createUserDto.email);
    const { firstName, lastName, age, email } = createUserDto;
    return await this.userRepository.insert({
      firstName,
      lastName,
      age,
      email
    });
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
    return await this.userRepository.find({
      // where: { id: MoreThan(2) },
      // where: { id: LessThan(2) },
      // where: { id: LessThanOrEqual(5) },
      // where: { firstName: "علی" },
      // where: { lastName: ILike("بهرام%") },
      // where: { lastName: Not("بهرامپور") }
      where
    });
  }

  async orderData() {
    return await this.userRepository.find({
      where: {},
      order: { id: "DESC", firstName: "ASC" }
    });
  }

  async pagination(paginationDto: PaginationDto) {
    let { page = 0, limit = 5 } = paginationDto;
    if (!page || page <= 0) page = 0;
    else page = page - 1;
    if (!limit || limit <= 0) limit = 5;
    const skip = page * limit;
    console.log(page, limit, skip);
    return await this.userRepository.find({
      where: {},
      order: { id: "DESC" },
      take: limit,
      skip
    });
  }

  async selection() {
    return await this.userRepository.find({
      where: {},
      order: { id: "ASC" },
      // relations: { profile: true },
      select: ["firstName", "lastName", "email"]
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { profile: true }
    });
    if (!user) throw new NotFoundException("کاربر یافت نشد.");
    return user;
  }

  async findUserWithProfile(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["profile"]
    });
    if (!user) throw new NotFoundException("کاربر یافت نشد.");
    return user;
  }

  async blogOfUser(userId: number) {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        blogs: true
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    const { firstName, lastName, age, email } = updateUserDto;
    await this.userRepository.update(
      { id },
      { firstName, lastName, age, email }
    );
    return {
      message: "user updated"
    };
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return {
      message: "removed successfully"
    };
  }

  async delete(id: number) {
    await this.findOne(id);
    await this.userRepository.delete({ id });
    return {
      message: "deleted successfully"
    };
  }

  async createProfile(profileDto: ProfileDto) {
    const { bio, photo, userId } = profileDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) {
      const profile = await this.profileRepository.findOneBy({ userId });
      if (profile) {
        if (bio) profile.bio = bio;
        if (photo) profile.photo = photo;
        await this.profileRepository.save(profile);
      } else {
        let newProfile = this.profileRepository.create({
          bio,
          photo,
          userId
        });
        newProfile = await this.profileRepository.save(newProfile);
        user.profileId = newProfile.id;
        await this.userRepository.save(user);
      }
      return {
        message: "profile created successfully"
      };
    }
    throw new NotFoundException("کاربری یافت شد لطفا یک حساب کاربری جدید بسازید");
  }

  async exists(email: string) {
    let user = await this.userRepository.findOneBy({ email });
    if (user) throw new ConflictException("ارباب ایمیل تکراری هست");
    // return true;
  }
}
