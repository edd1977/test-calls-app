import { Type } from '@angular/core';

export type Users = User[];

export class User {

    id: number;
    email: string;
    password: string;

}