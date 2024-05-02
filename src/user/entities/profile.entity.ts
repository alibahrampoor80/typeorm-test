import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("profile")
export class ProfileEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ nullable: true })
  bio: string;
  @Column({ nullable: true })
  photo: string;
  @Column()
  userId: number;
  @OneToOne(() => UserEntity, user => user.profile, { onDelete: "CASCADE" })
  user: UserEntity;
}