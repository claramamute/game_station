import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";
import { Transform, TransformFnParams } from "class-transformer";

@Controller("/produtos") //endereço url
export class ProdutoController{

    constructor (private readonly produtoService: ProdutoService ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id:number): Promise<Produto>{
        return this.produtoService.findById(id);
    }

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('nome')nome: string): Promise<Produto[]>{
        return this.produtoService.findByName(nome)
    }

    @Get('/menorPreco/:preco')
    @HttpCode(HttpStatus.OK)
    findLessThan(@Param('preco', ParseFloatPipe) preco: number): Promise<Produto[]>{
        return this.produtoService.findLessThan(preco)
    }

    @Get('/maiorPreco/:preco')
    @HttpCode(HttpStatus.OK)
    findMoreThan(@Param('preco', ParseFloatPipe) preco: number): Promise<Produto[]>{
        return this.produtoService.findMoreThan(preco)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto):  Promise<Produto>{
        return this.produtoService.create(produto) // Este decorator insere o Objeto postagem enviado no corpo da Requisição
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto ): Promise<Produto> { 
        return this.produtoService.update(produto)
    }
    
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) // Confirmar que foi excluido, sem conteudo 204
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id)
    }
}


