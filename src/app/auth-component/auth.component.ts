import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SwitchView } from "@angular/common/src/directives/ng_switch";

const BASE_URL = "https://diabolocom-test.herokuapp.com";

@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    accesssToken: string = "";

    constructor(private http: HttpClient) {
        const body = {
            email: 'smile@me.now',
            password: 'nutedau'
        };
        // Rewrite with MakeRequest
        http.post(`${BASE_URL}/login`, body).toPromise().then(response => {
            this.accesssToken = response["accessToken"];
        }).catch(error => {
            console.error(error);
        });
    }

    getRecords() {
        // Rewrite with MakeRequest
        const headers: HttpHeaders = new HttpHeaders().set("Authorization", `Bearer ${this.accesssToken}`);
        this.http.get(BASE_URL + "/records", { headers }).toPromise()
        .then(resp => console.log(resp))
        .catch(err => console.error(err));
    }

    getAgents() {
        // Rewrite with MakeRequest
        const url = BASE_URL + "/agents";
        const headers: HttpHeaders = new HttpHeaders().set("Authorization", `Bearer ${this.accesssToken}`);
        this.http.get(url, { headers }).toPromise()
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

    MakeHttpRequest(url: string, method: string, authNeeds: boolean = true, body: object = null): Promise<Object> {
        method = method.toLocaleLowerCase();
        let headers: HttpHeaders = null;
        if(authNeeds) {
            headers = new HttpHeaders().set("Authorization", `Bearer ${this.accesssToken}`);
        }
        let request: any = null;
        switch(method) {
            case 'get':
                request = this.http[method](BASE_URL + url, headers? { headers }: {});
                break;
            case 'put':
                request = this.http[method](BASE_URL + url, body, headers? { headers }: {});
                break;
        }
        return request.toPromise();
    } // MakeHttpRequest()

}