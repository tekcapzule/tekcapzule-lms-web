import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';

const FEED_API_PATH = `${environment.apiEndpointTemplate}/feed`
  .replace('{{api-gateway}}', environment.feedApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const FEEDS_MYFEEDS_CACHE_KEY = 'com.tekcapzule.feeds.myfeeds';
const FEEDS_PENDING_APPROVAL_CACHE_KEY = 'com.tekcapzule.feeds.pending.approval';
const FEEDS_METADATA_CACHE_KEY = 'com.tekcapzule.feeds.metadata';

@Injectable({
  providedIn: 'root',
})
export class FeedApiService {
  constructor(private httpClient: HttpClient) {}  
}
