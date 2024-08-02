import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Transform, TransformFnParams } from "class-transformer";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/categorias") //endereço url
export class CategoriaController{

    constructor (private readonly categoriaService: CategoriaService ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.categoriaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id:number): Promise<Categoria>{
        return this.categoriaService.findById(id);
    }

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Get('/categoria/:categoria')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('categoria')categoria: string): Promise<Categoria[]>{
        return this.categoriaService.findByName(categoria)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria):  Promise<Categoria>{
        return this.categoriaService.create(categoria) // Este decorator insere o Objeto postagem enviado no corpo da Requisição
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria: Categoria ): Promise<Categoria> { 
        return this.categoriaService.update(categoria)
    }
    
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) // Confirmar que foi excluido, sem conteudo 204
    delete(@Param('id', ParseIntPipe) id: number){
        return this.categoriaService.delete(id)
    }
}


