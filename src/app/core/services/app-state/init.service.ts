import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStateService } from './auth-state.service';
import { IUser } from '@app/shared/models/user-item.model';
import { AbstractBaseAuth } from '@app/auth/base-auth';

@Injectable({
  providedIn: 'root'
})
export class InitService extends AbstractBaseAuth{

    private userData: IUser;

    constructor(private httpClient: HttpClient, 
        public override authStateService: AuthStateService) {
        super(authStateService);
        console.log('isUserLoggedIn ---- data ', this.authStateService.isUserLoggedIn());
    }

    loadConfig(): Promise<any> {
        return this.httpClient.post<IUser>(
        'https://aj4w1i4vdc.execute-api.us-east-1.amazonaws.com/dev/lms/user/get',
        {
            "userId": this.authStateService.getEmail(),
            "tenantId": ""
        }).toPromise()
         .then(userData => {
            console.log('userData ---   ', userData);
           this.userData = userData as IUser;
         });    
    }

    getUserData() {
        return this.userData;
    }
}