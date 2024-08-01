//Classe auxiliar Bcrypt -> criptografar a senha e validar a senha digitada no login comparando com a do BD

import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'; // Importar tudo da lib

@Injectable() //É uma classe de serviço - será injetdada em outras 
export class Bcrypt{

    async criptografarSenha(senha: string): Promise<string>{
        let saltos: number = 10; //Quantidade de caracteres aleatorios inseridos a mais
        return await bcrypt.hash(senha, saltos) //função hash responsável por gerar a cripto
    }

    async compararSenha(senhaDigitada: string, senhaBancoDados: string): Promise<boolean>{ // Retorna true ou false
        return await bcrypt.compare(senhaDigitada, senhaBancoDados)
    }
}