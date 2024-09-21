import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReferenceDetail } from '@app/shared/models/reference-item.model';


import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const REFERENCE_API_PATH = `${environment.apiEndpointTemplate}/reference`
  .replace('{{api-gateway}}', environment.referenceApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const REFERENCE_GETALL_REFERENCE_CACHE_KEY = 'com.tekcapzule.reference.allreferences';
@Injectable({
  providedIn: 'root',
})
export class ReferenceApiService {
 
  constructor(private httpClient: HttpClient) {}


  getAllReference(): Observable<IReferenceDetail[]> {
    return this.httpClient.post<IReferenceDetail[]>(
      `${REFERENCE_API_PATH}/getAll`,
      {},
      {
        params: {
          cache: 'yes',
          ckey: REFERENCE_GETALL_REFERENCE_CACHE_KEY,
        },
      }
    );
  }

  
}
