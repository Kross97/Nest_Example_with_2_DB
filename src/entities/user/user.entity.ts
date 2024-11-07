import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

export class Name {
    @Column()
    first: string;

    @Column()
    last: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column(() => Name)
  name: Name;

  @Column()
  test: string;

  @CreateDateColumn()
  createdAt: Date;
}