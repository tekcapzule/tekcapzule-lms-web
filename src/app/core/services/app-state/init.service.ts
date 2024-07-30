import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStateService } from './auth-state.service';
import { IUser } from '@app/shared/models/user-item.model';
import { AbstractBaseAuth } from '@app/auth/base-auth';
import { environment } from '@env/environment';

const CERTIFICATE_API_PATH = `${environment.apiEndpointTemplate}/lms/user`
  .replace('{{api-gateway}}', environment.certificateApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const USER_API_PATH = `${environment.apiEndpointTemplate}/lms/user`
  .replace('{{api-gateway}}', environment.userApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

@Injectable({
  providedIn: 'root'
})
export class InitService extends AbstractBaseAuth {
  private userData: IUser;

  constructor(
    private httpClient: HttpClient,
    public override authStateService: AuthStateService
  ) {
    super(authStateService);
    console.log(
      'isUserLoggedIn ---- data ',
      this.authStateService.isUserLoggedIn()
    );
  }

  loadConfig(): Promise<any> {
    return this.httpClient
      .post<IUser>(`${USER_API_PATH}/get`, {
        userId: this.authStateService.getEmail(),
        tenantId: ''
      })
      .toPromise()
      .then(userData => {
        this.userData = userData as IUser;
      });
  }

  getUserData(): IUser {
    return this.userData;
  }

  downloadCertificate(certificateRequestBody: any) {
    return this.httpClient.post<any>(
      `${CERTIFICATE_API_PATH}/certificate`,
      certificateRequestBody
    );
  }
}
