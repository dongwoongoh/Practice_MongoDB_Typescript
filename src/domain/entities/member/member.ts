export class Member {
    private _id: string;
    private _email: string;
    private _password: string;
    private _cash: number;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _deletedAt?: Date;

    constructor(
        id: string,
        email: string,
        password: string,
        cash: number,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    ) {
        this._id = id;
        this._email = email;
        this._password = password;
        this._cash = cash;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deletedAt = deletedAt;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get cash(): number {
        return this._cash;
    }

    set cash(value: number) {
        this._cash = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }

    get deletedAt(): Date {
        return this._deletedAt;
    }

    set deletedAt(value: Date) {
        this._deletedAt = value;
    }
}
