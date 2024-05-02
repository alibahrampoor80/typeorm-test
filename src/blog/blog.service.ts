import { Injectable } from "@nestjs/common";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogEntity } from "./entities/blog.entity";
import { Repository } from "typeorm";

@Injectable()
export class BlogService {
  constructor(@InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>) {
  }

  async create(createBlogDto: CreateBlogDto) {
    const { title, text, userId } = createBlogDto;
    await this.blogRepository.insert({
      title, text, userId
    });
    return {
      message: "blog created!"
    };
  }

  async findAll() {
    return await this.blogRepository.find({
      relations: {
        user: true
      },
      select: {
        user: { firstName: true, lastName: true, email: true }
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
