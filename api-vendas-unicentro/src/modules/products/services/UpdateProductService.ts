import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/http/errors/AppError";

interface IRequest{
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export default class UpdateProductService{

    public async execute({id, name, price, quantity}: IRequest) : Promise<Product>{
        const productsRepository = getCustomRepository(ProductsRepository);
        const product = await productsRepository.findOne(id);
        if(!product){
            throw new AppError('Product not found.');
        }
        //verificar se o novo nome do produto tbm já não exite e que não é o mesmo
        const productExists = await productsRepository.findByName(name);
        if(productExists && name != product.name){
            throw new AppError('There is already one product with this name.');
        }
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);

        return product;
    }
}