import { User } from "../entities/User.entity.ts";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Relation,
} from "typeorm";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateNewsInput:
 *      type: object
 *      required:
 *        - title
 *        - text
 *      properties:
 *        title:
 *          type: string
 *          default: swagger
 *        text:
 *          type: string
 *          default: swagger test post request
 *    CreateNewsResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */
@Entity("news")
export class News extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.news)
  @JoinColumn({ name: "authorId" })
  author: Relation<User>;
}
