import {
  Controller,
  Get,
  Param,
  Query
} from "@nestjs/common";
import { UserBuilderService } from "./query.builder.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { PaginationDto } from "./dto/pagination.dto";
import { ProfileDto } from "./dto/profile.dto";

@Controller("builder")
export class UserBuilderController {
  constructor(private readonly userService: UserBuilderService) {
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

}
