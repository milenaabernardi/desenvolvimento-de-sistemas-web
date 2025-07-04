import AppError from "@shared/http/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrderRepository from "../typeorm/repositories/OrderRepository";

interface IRequest {
    id: string;

}

export default class ShowOrderService {

    public async execute({ id }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrderRepository);
        const order = await ordersRepository.findById(id);
        if (!order) {
            throw new AppError('Order not find.');
        }

        return order;

    }
}