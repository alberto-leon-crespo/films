import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum FilmGender {
  Terror = 0,
  Drama = 1,
  Comedia = 2,
  Acción = 3
}

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;

  @Column("text")
  description: string;

  @Column("enum", { enum: FilmGender })
  gender: string;

  @Column("text")
  poster: string;
}