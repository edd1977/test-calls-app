import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Wrapups } from '../model/record.model';
import { Users } from '../model/user.model';

const BASE_URL = "https://diabolocom-test.herokuapp.com";

@Injectable()
export class HttpService {

    private accesssToken: string = "";
    get checkAccessToken(): boolean {
        return this.accesssToken && this.accesssToken.length > 0;
    }
    
    constructor(private http: HttpClient) {
        //
    }

    async Authorize(email: string, password: string): Promise<any> {
        const body = {
            email: email,
            password: password
        };
        const response = await this.MakeHttpRequest("/login", "post", false, body);
        if(response["accessToken"]) {
            this.accesssToken = response["accessToken"];
            return this.accesssToken;
        }
        return Promise.reject(response); // error
    } // Authorize()

    getRecords() {
        return this.MakeHttpRequest("/records", "get", true)
    }

    getRecord(id: number) {
        return this.MakeHttpRequest("/records/" + id, "get", true);
    }

    getAgents() {
        return this.MakeHttpRequest("/agents", "get", true);
    }

    addRecord(data: any) {
        // POST /records {body}
    }

    deleteRecord(id: number) {
        // DELETE /records/id
    }

    updateRecord(data: any) {
        // PUT /records/id {body}
    }

    addUser(data: any) {
        // POST /users {body}
    }

    deleteUser(id: number) {
        // DELETE /users/id
    }

    getUser(id: number) {
        // GET /users/id
    }

    getUsers(): Promise<Users> {
        // GET /users
        return this.MakeHttpRequest("/users", "get", true) as Promise<Users>;
    }

    updateUser(data: any) {
        // PUT /users/id {body}
    }

    getWrapups(): Promise<Wrapups> {
        // GET /wrapups
        return this.MakeHttpRequest("/wrapups", "get", true) as Promise<Wrapups>;
    }

    private MakeHttpRequest(url: string, method: string, authNeeds: boolean = true, body: object = null): Promise<Object> {
        method = method.toLocaleLowerCase();
        let headers: HttpHeaders = null;
        if(authNeeds) {
            headers = new HttpHeaders().set("Authorization", `Bearer ${this.accesssToken}`);
        }
        let request: any = null;
        switch(method) {
            // case 'delete'
            case 'get':
                request = this.http[method](BASE_URL + url, headers? { headers }: {});
                break;
            case 'post':
            case 'put':
                request = this.http[method](BASE_URL + url, body, headers? { headers }: {});
                break;
        }
        return request.toPromise();
    } // MakeHttpRequest()    

}