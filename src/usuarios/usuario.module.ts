import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { Bcrypt } from '../auth/bcrypt/bcrypt';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuarioService, Bcrypt], //a Classe de Serviço e a Classe Brypt poderão ser injetadas em outras Classes dentro do Módulo Usuario.
  controllers: [UsuarioController],
  exports: [UsuarioService]
})
export class UsuarioModule {}
