import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "postgres",
        host: "127.0.0.1",
        port: 5432,
        username: "postgres",
        password: "09132605962",
        database: "typeorm_test",
        autoLoadEntities: true,
        entities: [
          "dist/**/*.entity{.ts,.js}",
        ],
        synchronize: true
      }
    ),
    UserModule,
    BlogModule

  ],

  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
