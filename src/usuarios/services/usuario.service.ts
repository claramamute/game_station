import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import * as moment from 'moment';
@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario | undefined> { //Função auxiliar para retornar um user ou não 
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find(
            {
                relations:{
                    produto: true
                }
            }
        );

    }

    async findById(id: number): Promise<Usuario> {

        let usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                produto: true
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }

    //

    async create(usuario: Usuario): Promise<Usuario> {
        
        let buscaUsuario = await this.findByUsuario(usuario.usuario); //tenta buscar o email no objeto usuario

        

        if (!buscaUsuario) { //caso não exista, vai criar 
            const now = moment()
            const nascimento = moment(usuario.dataNascimento, "DD-MM-YYYY")
            const dataFormatada = nascimento.format("YYYY-MM-DD")
            const idade = now.diff(nascimento, "years")

            if(idade >= 18){
                const dataNascimento = new Date(dataFormatada);
                usuario.dataNascimento = dataNascimento
                usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha) // a senha que ele digitar será criptografada 
                return await this.usuarioRepository.save(usuario); // Salva esse usuario com a senha criptografada 
            } else{
                throw new HttpException("O Usuario tem que ser maior de idade!", HttpStatus.BAD_REQUEST);
            }

        }

        throw new HttpException("O Usuario ja existe!", HttpStatus.BAD_REQUEST);

    }

    async update(usuario: Usuario): Promise<Usuario> {

        let updateUsuario: Usuario = await this.findById(usuario.id); // busca se existe um user com esse id 
        let buscaUsuario = await this.findByUsuario(usuario.usuario); // busca se existe esse email 

        if (!updateUsuario) // caso não exista o id
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        if (buscaUsuario && buscaUsuario.id !== usuario.id) // caso exista o usuario e o id dele for diferente 
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);

    }

}


