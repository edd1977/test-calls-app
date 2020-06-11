import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    getAgents() {
        this.MakeHttpRequest("/agents", "get", true)
        .then(resp => console.log(resp))
        .catch(err => console.error(err));
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

    getUsers() {
        // GET /users
    }

    updateUser(data: any) {
        // PUT /users/id {body}
    }

    getWrapups() {
        // GET /wrapups
        this.MakeHttpRequest("/wrapups", "get", true)
        .then(resp => console.log(resp))
        .catch(err => console.error(err));
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