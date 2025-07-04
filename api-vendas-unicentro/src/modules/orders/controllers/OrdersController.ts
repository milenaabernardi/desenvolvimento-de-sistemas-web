import { NextFunction, Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ShowOrderService from "../services/ShowOrderService";
import ListOrderService from "../services/ListOrderService";

export default class OrdersController{

    public async index(request: Request,response: Response,next: NextFunction): Promise<Response | void> {
        try {
            const listOrders = new ListOrderService();
            const orders = await listOrders.execute();
            return response.json(orders);
        } catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction) :Promise<Response | void>{
        const { id } = request.params;
        const showOrder = new ShowOrderService();
        const order = await showOrder.execute({id});
        return response.json(order);
    }

    public async create(request: Request, response: Response, next: NextFunction):Promise<Response | void>{
        try{
            const {customer_id, products} = request.body;
            const createOrder = new CreateOrderService();
            const order = await createOrder.execute({customer_id, products});
            return response.json(order);
        }catch (err) {
            next(err);
        }
    }    
}