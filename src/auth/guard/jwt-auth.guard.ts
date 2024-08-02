import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

//Guard personalizado, que será utilizado por todos os endpoints protegidos ou pela Classe Controladora para proteger todos os seus endpoints, para validar os Tokens JWT recebidos no Cabeçalho das Requisições.