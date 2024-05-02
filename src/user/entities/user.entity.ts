import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogEntity } from "../../blog/entities/blog.entity";
import { ProfileEntity } from "./profile.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  age: number;
  @Column({ nullable: true })
  profileId: number;
  @CreateDateColumn()
  createdAt: Date;
  @OneToMany(() => BlogEntity, blog => blog.user)
  blogs: BlogEntity[];

  @OneToOne(() => ProfileEntity, profile => profile.user,
    { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "profileId" })
  profile: ProfileEntity;
}
