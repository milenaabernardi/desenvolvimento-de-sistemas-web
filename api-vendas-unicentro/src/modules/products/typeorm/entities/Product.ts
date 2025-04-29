import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('products')
export default class Product{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column() //faz automaticamente o mapeamento para varchar
    name: string;
    @Column('decimal')
    price: number;
    @Column('int')
    quantity: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}