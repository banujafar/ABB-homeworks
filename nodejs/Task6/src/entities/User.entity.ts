import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { News } from "./News.entity.ts";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;


  @Column()
  password: string;

  @OneToMany(() => News, (news) => news.author)
  news: News[];
}
