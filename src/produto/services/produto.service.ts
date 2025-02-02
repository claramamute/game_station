import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";


@Injectable()
export class ProdutoService{
    constructor(
        @InjectRepository(Produto)
        private produtoRepository : Repository<Produto>,
        private categoriaService: CategoriaService //Para termos acesso aos Métodos da Classe TemaService
    ){ }

    async findAll(): Promise<Produto[]>{
        return await this.produtoRepository.find({
            relations: {
                categoria: true,
                usuario: true
            }
        })
    }

    async findById(id: number): Promise<Produto>{
        let produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true,
                usuario: true
            }
        })

        if(!produto)
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND) 

        return produto
    }

    async findByName(nome: string): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true,
                usuario: true
            }
        })
    }

    async findLessThan(preco: number): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where: {
                preco: LessThan(preco) //Menor valor
            },
            order: {
                preco: "ASC" // Ordena de ordem crescente
            }
        })
    }

    async findMoreThan(preco: number): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where: {
                preco: MoreThan(preco) // Maior valor
            },
            order: {
                preco: "ASC"
            }
        })
    }

    async create(produto: Produto):  Promise<Produto>{

        if(produto.categoria){
            await this.categoriaService.findById(produto.categoria.id)
            return await this.produtoRepository.save(produto)
        }
        return await this.produtoRepository.save(produto)
    }

    async update(produto: Produto):  Promise<Produto>{

        let buscaProduto: Produto = await this.findById(produto.id) 

        if(!buscaProduto|| !produto.id){ 
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)
        }

        if(produto.categoria){
            await this.categoriaService.findById(produto.categoria.id)
            
            return await this.produtoRepository.save(produto) 
        }

        return await this.produtoRepository.save(produto)
    }

    async delete(id:number): Promise<DeleteResult>{
        
        let buscaProduto = await this.findById(id)

        if(!buscaProduto) 
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND) 
        
        return await this.produtoRepository.delete(id); 
    }
}