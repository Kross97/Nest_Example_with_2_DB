import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { MediaBufferEntity } from './MediaBuffer.entity';



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

  @OneToOne(() => MediaBufferEntity, {
    cascade: true
  })
  @JoinColumn()
  buffer: MediaBufferEntity;

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