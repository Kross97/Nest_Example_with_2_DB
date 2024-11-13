import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class MediaBufferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb'})
  buffer: { data: Buffer }
}