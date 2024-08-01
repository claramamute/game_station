import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";

@Entity({name: 'tb_usuarios'})
export class Usuario{

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    usuario: string;
    
    @Transform(({value}: TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    senha: string;

    @IsNotEmpty()
    @Column({ type: 'date', nullable: false }) 
    dataNascimento: Date; 

    @OneToMany(() => Produto, (produto) => produto.usuario )
    produto: Produto[]
}