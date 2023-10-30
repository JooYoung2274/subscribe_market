import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Items } from './item';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name' })
  name: 'string';

  @OneToMany(() => Items, (item) => item.Category)
  Item: Items[];
}
