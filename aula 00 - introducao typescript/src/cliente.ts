import Endereco from "./endereco";
import Telefone from "./telefone";

export default class Cliente{
    private _nome : string;
    private _cpf : number;
    private _dataNascimento : number;
    private _endereco : Endereco;
    private _sexo : string;
    private _telefone : Telefone[] = [];

    constructor(nome : string, cpf : number, dataNascimento : number, sexo : string, endereco : Endereco){
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento;
        this._sexo = sexo;
        this._endereco = endereco;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    get cpf(): number {
        return this._cpf;
    }

    set cpf(cpf: number) {
        this._cpf = cpf;
    }

    get dataNascimento(): number {
        return this._dataNascimento;
    }

    set dataNascimento(dataNascimento: number) {
        this._dataNascimento = dataNascimento;
    }

    get endereco(): Endereco {
        return this._endereco;
    }

    set endereco(endereco: Endereco) {
        this._endereco = endereco;
    }

    get sexo(): string {
        return this._sexo;
    }

    set sexo(sexo: string) {
        this._sexo = sexo;
    }

    get telefone(): Telefone[] {
        return this._telefone;
    }

    set telefone(telefone: Telefone[]) {
        this._telefone = telefone;
    }
}