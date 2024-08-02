import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"; //ESTRATEGIA JWT
import { jwtConstants } from "../constants/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({ // p usar  jwt do Passport -> configurar algumas propriedades da Classe herdada
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Metodo p Extrair do HEAD da requisição o token
            ignoreExpiration: false, // Bloquear solicitações com tokens expirados 
            secretOrKey: jwtConstants.secret, //Informa que a chave de assinatura do Token JWT está armazenada no arquivo constants.ts 
        });
    }

    async validate(payload: any){ //parâmetro será gerado no login do usuário.
        return payload; //é um Objeto JSON, que contém as declarações do Token JWT -> são as informações sobre uma entidade (normalmente, o usuário) e alguns dados adicionais.
    }
}