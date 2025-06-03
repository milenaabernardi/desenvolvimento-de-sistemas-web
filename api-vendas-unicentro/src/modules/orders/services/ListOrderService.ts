import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrderRepository";


export default class ListOrderService {
    public async execute(): Promise<Order[]> {

        const ordersRepository = getCustomRepository(OrdersRepository);
        const orders = ordersRepository.find();
        return orders;
    }
}