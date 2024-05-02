import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query, ParseIntPipe
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { PaginationDto } from "./dto/pagination.dto";
import { ProfileDto } from "./dto/profile.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("insert")
  insert(@Body() createUserDto: CreateUserDto) {
    return this.userService.insert(createUserDto);
  }
  @Post("profile")
  createProfile(@Body() ProfileDto: ProfileDto) {
    return this.userService.createProfile(ProfileDto);
  }

  @Get()
  findAll(@Query("search") search: string) {
    return this.userService.findAll(search);
  }

  @Get("order")
  orderData() {
    return this.userService.orderData();
  }

  @Get("pagination")
  pagination(@Query() paginationDto: PaginationDto) {
    return this.userService.pagination(paginationDto);
  }

  @Get("selection")
  selection() {
    return this.userService.selection();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }
  @Get("profile/:id")
  findUserWithProfile(@Param("id") id: string) {
    return this.userService.findUserWithProfile(+id);
  }

  @Get("blog/:id")
  blogOfUser(@Param("userId") userId: number) {
    return this.userService.blogOfUser(+userId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }

  @Delete("delete/:id")
  delete(@Param("id") id: string) {
    return this.userService.delete(+id);
  }
}
