import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    new Date();
    return "Hello World!";

  }
}
