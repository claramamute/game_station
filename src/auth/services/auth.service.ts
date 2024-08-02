import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { UsuarioService } from '../../usuarios/services/usuario.service';


@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService, // usar métodos de buscar user
        private jwtService: JwtService, // Classe de Serviço responsável por gerar o Token JWT
        private bcrypt: Bcrypt //checar senhas digitadas e do banco
    ){ }

    async validateUser(username: string, password: string): Promise<any>{ // validar os Atributos usuario (e-mail) e a senha enviados no Objeto UsuarioLogin

        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenha(password, buscaUsuario.senha) //Ver se as senhas digitada e do banco batem

        if(buscaUsuario && matchPassword){
            const { senha, ...resposta } = buscaUsuario // separa a senha do objeto usuario e Operador Spread para receber todos os atributos do Objeto Usuário, exceto a senha.
            return resposta
        }

        return null

    }

    async login(usuarioLogin: UsuarioLogin){ //receber as credenciais do usuário do Corpo da Requisição de login e enviar para o Passport autenticar (login) e validar o usuario na aplicação e GERAR TOKEN
//sem a autenticação não será possível gerar o Token JWT e obter o acesso aos endpoints protegidos.

        const payload = { sub: usuarioLogin.usuario } // utilizado na geração do Token JWT sub - email
//parte customizada do Token -> definimos as Claims (atributos dentro de um JSON contendo as informações sobre o usuário) p/ enviar no Token JWT.

        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario) // procura o usuario com aquele email 

        return{ //será retornado um JSON contendo todos os atributos do Objeto Usuario encontrado na busca preenchidos e o Token
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            data: buscaUsuario.dataNascimento,
            token: `Bearer ${this.jwtService.sign(payload)}`, // criará apenas a parte codificada do Token JWT, por isso foi inserida a palavra Bearer
        }

    }
}