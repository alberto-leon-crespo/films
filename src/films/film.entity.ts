import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum FilmGender {
  Terror = 'Terror',
  Drama = 'Drama',
  Comedia = 'Comedia',
  Acción = 'Acción'
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