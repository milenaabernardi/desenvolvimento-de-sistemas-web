import { EntityRepository, Repository } from "typeorm";
import Product from "../entities/Product";

@EntityRepository(Product)
export default class ProductsRepository extends Repository<Product>{

    //esse método retorna uma promessa
    public async findByName(name: string): Promise<Product | undefined>{
        const product = this.findOne({
            where: { name }
        })
        return product;
    }
}