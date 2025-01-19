import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class RentCarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  year: number;

  @ManyToMany(() => User, (user) => user.rentCars, { cascade: ["insert"] })
  // { cascade: ['insert']} нужно для рекурсивной вставки структуры (если у User cascade: true)
  // т.к cascade: true c двух сторон даст ошибку
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
