import { Post } from 'src/post/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  username: string;
  @Column('varchar')
  password: string;

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  posts: Post[];
}
