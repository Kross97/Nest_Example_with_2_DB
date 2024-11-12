import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable, OneToMany,
} from 'typeorm';
import { Car } from '../car/car.entity';
import { RentCarEntity } from '../rentCar/rent-car.entity';
import { MediaMaterialsEntity } from '../media_materials/MediaMaterials.entity';

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

  @OneToOne(() => Car, (car) => car.user, { cascade: true })
  // { cascade: true} - нужен для рекурсивной вставки элементов
  @JoinColumn() // выставляет внешний ключ на этой таблице
  car: Car;

  @ManyToMany(() => RentCarEntity, (rentCar) => rentCar.users, { cascade: true })
  @JoinTable() // @JoinTable() требуется для @ManyToMany отношений. Вы должны поставить @JoinTable на одну (владеющую) сторону отношения.
  rentCars: RentCarEntity[];

  @OneToMany(() => MediaMaterialsEntity, (mediaMaterial) => mediaMaterial.user, {
    onDelete: 'CASCADE',
    cascade: ['insert']
  })
  //  Если вы хотите использовать @OneToMany, @ManyToOne является обязательным.
  mediaMaterials: MediaMaterialsEntity[];

  @CreateDateColumn()
  createdAt: Date;
}