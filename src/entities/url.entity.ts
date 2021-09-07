import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class UrlInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({type:'varchar', length: 1024, unique: true})
  original_url: string;

  @PrimaryColumn({type:'varchar', length: 8, unique: true})
  short_url: string;

  @Column({type: 'int', nullable: false, default: 0})
  visits: number;

  @CreateDateColumn()
  date_created: Date;

  @UpdateDateColumn()
  date_updated: Date;

}