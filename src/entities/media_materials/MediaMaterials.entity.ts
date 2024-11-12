import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';



@Entity()
export class MediaMaterialsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  mimeType: string;

  @Column({ type: 'jsonb'})
  data: any;

  @ManyToOne(() => User, (user) => user.mediaMaterials, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  //  @ManyToOne, вы можете определить его без указания @OneToMany у связанной сущности
  //  Где вы устанавливаете @ManyToOne- его связанная сущность будет иметь "идентификатор отношения" и внешний ключ.
  user: User

  @CreateDateColumn()
  createdAt: Date;
}