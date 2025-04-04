import Produto from "./produto";
import Cliente from "./cliente";

export default class Venda{
    private _codigo : number;
    private _data : number;
    private _cliente : Cliente;
    private _produto : Produto[] = [];

    constructor(codigo: number, data: number, cliente: Cliente) {
        this._codigo = codigo;
        this._data = data;
        this._cliente = cliente;
    }

    get codigo(): number {
        return this._codigo;
    }

    set codigo(codigo: number) {
        this._codigo = codigo;
    }

    get data(): number {
        return this._data;
    }

    set data(data: number) {
        this._data = data;
    }

    get cliente(): Cliente {
        return this._cliente;
    }

    set cliente(cliente: Cliente) {
        this._cliente = cliente;
    }

    get produto(): Produto[] {
        return this._produto;
    }

    set produto(produto: Produto[]) {
        this._produto = produto;
    }

    calcularTotal(): number {
        let total = 0;
        for (let i = 0; i < this._produto.length; i++) {
            total += this._produto[i].valor;
        }
        return total;
    }
}