import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import AppError from "@shared/http/errors/AppError";

interface IRequest{
    name: string;
    email: string;
}

export default class CreateCustomerService{
    public async execute({name, email} : IRequest) : Promise<Customer>{
        const customersRepository = getCustomRepository(CustomersRepository);
        const emailExist = await customersRepository.findByEmail(email);
        if(emailExist){
            throw new AppError('Email address already used');
        }
        const customer = customersRepository.create({
            name,
            email});
        await customersRepository.save(customer);
        return customer;
    }
}