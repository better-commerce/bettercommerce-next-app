import { BaseModel } from "@models/base";

export class AuthModel extends BaseModel {
    authenticated = false;
    userId;
    token;
    firstName;
    lastName;
    email;

    constructor(token, userId) {
        super();
        this.userId = userId;
        this.token = token;
        this.authenticated = !!this.token;
    }
}