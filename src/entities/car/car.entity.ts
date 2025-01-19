import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "vw" })
  model: string;

  @Column({ nullable: true, default: 2024 })
  year: number;

  @OneToOne(() => User, (user) => user.car)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
