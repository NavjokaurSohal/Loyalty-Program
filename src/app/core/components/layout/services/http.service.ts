import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(
        private http: HttpClient, 
        private authService: AuthService
    ) {}
    
    get(url: string, headers?:any, requestOptions?:any) {
        let fullUrl = this.getUrl(url);
        let httpHeaders = this.setHeaders(headers);
        let reqOptions = this.setRequestOptions(httpHeaders, requestOptions);
        return this.http.get(fullUrl,reqOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    };

    post(url:string, data:any|null, headers?:any, requestOptions?:any) {
        let fullUrl = this.getUrl(url);
        let httpHeaders = this.setHeaders(headers);
        let reqOptions = this.setRequestOptions(httpHeaders, requestOptions);
        return this.http.post(fullUrl,data,reqOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    };

    public delete(url: string, headers?: any, requestOptions?: any) {
        let fullUrl = this.getUrl(url);
        let httpHeaders = this.setHeaders(headers);
        let reqOptions = this.setRequestOptions(httpHeaders, requestOptions);
        return this.http.delete(fullUrl, reqOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    };

    patch(url:string, data:any|null, headers?:any, requestOptions?:any){
        let fullUrl = this.getUrl(url);
        let httpHeaders = this.setHeaders(headers);
        let reqOptions = this.setRequestOptions(httpHeaders, requestOptions);
        return this.http.patch(fullUrl,data,reqOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    };
    put(url:string, data:any|null, headers?:any, requestOptions?:any){
        let fullUrl = this.getUrl(url);
        let httpHeaders = this.setHeaders(headers);
        let reqOptions = this.setRequestOptions(httpHeaders, requestOptions);
        return this.http.put(fullUrl,data,reqOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    };

    private getUrl(url:string) {
        return environment.apiUrl+'/'+url;
    }

    private setHeaders(headers:any) {
        let httpHeaders = new HttpHeaders();

        if (this.authService.getToken()) {
            httpHeaders = httpHeaders.append('Authorization', 'Bearer '+ this.authService.getToken());
        }

        if (headers) {
            for(let i in headers) {                
                if(!httpHeaders.has(i)) {
                    httpHeaders = httpHeaders.append(i, headers[i]);
                }
            }
        }

        return httpHeaders;
    }

    private setRequestOptions(headers:any, requestOptions:any) {
        let options = {
            headers: headers
        };
        
        if(requestOptions) {
            options = Object.assign(options, requestOptions);
        }
            
        return options;
    }

    // checkUserExistence(phoneNumber: string): Observable<any> {
    //     // Assuming you have an API endpoint to check user existence and retrieve data
    //     return this.http.get(`customerdata/check/${phoneNumber}`);
    //   }
}