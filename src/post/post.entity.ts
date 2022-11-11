import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  text: string;

  @ManyToOne(() => User, (user: User) => user.posts, {
    onDelete: 'CASCADE',
  })
  user: User;
}
