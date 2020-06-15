import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Records, Wrapups, Record } from '../model/record.model';
import { Users, User } from '../model/user.model';
import { Agents } from '../model/agents.model';


@Injectable()
export class AppService {

    records: Records = [];
    wrapups: Wrapups = [];
    users: Users = [];
    agents: Agents;

    constructor(private http: HttpService) {
        //
    }

    logIn(email: string, pass: string): Promise<any> {
        return this.http.Authorize(email, pass);
    }

    async getRecords(): Promise<Records> {
        this.records = await this.http.getRecords() as Records;
        return this.records;
    }

    async getRecord(id: number): Promise<Record> {
        const record = await this.http.getRecord(id) as Record;
        return record;
    }

    async getWrapups(): Promise<Wrapups> {
        this.wrapups = await this.http.getWrapups() as Wrapups;
        return this.wrapups;
    }

    async getUsers(): Promise<Users> {
        this.users = await this.http.getUsers() as Users;
        return this.users;
    }

    async getAgents(): Promise<Agents> {
        this.agents = await this.http.getAgents() as Agents;
        return this.agents;
    }

}