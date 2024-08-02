import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

//Local Guard -> por meio da implementação da Classe LocalAuthGuard como uma Herança da Classe AuthGuard, o Passport criará um Guard personalizado, chamado local, que será utilizado pelos endpoints de autenticação para processar as credenciais do usuário (usuario e senha).