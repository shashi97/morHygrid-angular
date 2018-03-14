import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoaderService } from '../loader/loader.service';
import { ApiUrl } from '../../shared/api.service';
import { ErrorService } from '../error/error.service';
import { LocalStorageService } from './local-storage.service';
import { ErrorModel } from '../error/error.model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class HttpInterceptor extends Http {
  error: ErrorModel = new ErrorModel();
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private apiService: ApiUrl,
    private router: Router,
    private loaderService: LoaderService,
    private errorService: ErrorService,
    private localStorageService: LocalStorageService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
    // return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
    // return super.get(url, this.getRequestOptionArgs(options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    // return super.post(url, body, this.getRequestOptionArgs(options));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    // return super.put(url, body, this.getRequestOptionArgs(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    // return super.delete(url, this.getRequestOptionArgs(options));
  }


  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    options.withCredentials = true;
    if (options.headers == null) {
      options.headers = new Headers();
    }

    options.headers.append('Content-Type', 'application/json');

    // const access_token = this.localStorageService.getAccessToken();
    // if (access_token !== '') {
    //   document.cookie = 'Authorization=' + access_token;
    //   options.headers.append('authorization', access_token);
    // }

    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    this.loaderService.show();

    return observable.catch((err, source) => {
      this.error.isError = true;
      this.error.errorMessages = [];
      if (err.status === 401) {                     // UnOthorised Access
        this.localStorageService.removeLogin();
        this.router.navigate(['/login']);
        return Observable.empty();
      } else if (err.status === 0) {                // Api Connection Refused
        this.showErrorMessage('Server down!');
        return Observable.throw(err);
      } else if (err.status === 404) {              // API path not found
        // this.showErrorMessage('404 (Path not found!)');
        return Observable.throw(err);
      } else if (err.status === 400) {              // Bad Request
        let errorResult = err.json();
        if (errorResult.ValidationErrors && errorResult.ValidationErrors.length > 0) {
          errorResult.ValidationErrors.forEach(errMsg => {
            this.showErrorMessage(errMsg.ErrorMessage);
          });
        } else {
          this.showErrorMessage('400 (Bad Request)');
        }
        return Observable.throw(err);
      } else if (err.status === 500) {              // Internal Server error
        this.showErrorMessage('500 (Internal Server error)');
        return Observable.throw(err);
      } else {
        return Observable.throw(err);
      }
    })
      .finally(() => {
        this.loaderService.hide();
      });
  }

  private showErrorMessage(errorMessage) {
    this.error.errorMessages.push({ severity: 'error', summary: '', detail: errorMessage });
    this.errorService.sendErrorMessage(this.error);
  }
}
