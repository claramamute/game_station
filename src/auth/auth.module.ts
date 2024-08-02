import { Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "../usuarios/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthController } from "./controllers/auth.controller";


@Module({
    imports: [
        UsuarioModule, // validar o usuário e senha no Banco de dados da aplicação no login
        PassportModule, //implementar o pacote Passport e as suas Strategies
        JwtModule.register({ //criar o Token JWT - configurar algumas propriedades dentro do Módulo
            secret: jwtConstants.secret, // secret (chave de assinatura do token JWT) com o valor da propriedade secret da jwtConstant
            signOptions: {expiresIn: '1h'}, //propriedades específicas do Método sign() - tempo de duração
        })
    ],
    providers: [Bcrypt, AuthService, LocalStrategy,JwtStrategy],
    controllers: [AuthController], // endpoints da Classe Controladora estrão disponíveis para receber Requisições HTTP
    exports: [Bcrypt]
})

export class AuthModule{}
