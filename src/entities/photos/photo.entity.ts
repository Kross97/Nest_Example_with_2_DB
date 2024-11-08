import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Blob;

  @ManyToOne(() => User, (user) => user.photos)
  //  @ManyToOne, вы можете определить его без указания @OneToMany у связанной сущности
  //  Где вы устанавливаете @ManyToOne- его связанная сущность будет иметь "идентификатор отношения" и внешний ключ.
  user: User

  @CreateDateColumn()
  createdAt: Date;
}