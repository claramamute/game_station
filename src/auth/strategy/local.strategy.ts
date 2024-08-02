import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"; //Importação estratégia LOCAL
import { AuthService } from "../services/auth.service";


//Utilizar no processo de autenticação para validar as credenciais do usuário (usuario e senha).
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) { //estende a Classe PassportStrategy, que possui o parâmetro Strategy -> responsável por implementar a Local Strategy do Passport
    constructor(private authService: AuthService) { //Precisa ter acesso aos Métodos dessa Classe, logo injetou no construtor
        super({ //Executa o Construtor da classe base, ou seja, a Classe que está sendo estendida (herdada)
            usernameField: 'usuario', // a Classe Auxiliar UsuarioLogin não possui estes 2 Atributos, logo tem que declarar 
            passwordField: 'senha'
        })
    }

    async validate(username: string, password: string): Promise<any> { //parâmetros serão recebidos na autenticação (login) do usuário.
        
        const user = await this.authService.validateUser(username, password); //valida se o usuário existe e se a senha digitada está correta. 

        if(!user){
            throw new UnauthorizedException();
        }
        
        return user; // Objeto da Classe Usuario, sem o Atributo senha
    }


}
