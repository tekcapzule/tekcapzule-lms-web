import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiSuccess } from '@app/shared/models/api.model';
import { cacheManager } from '@app/shared/utils/cache-manager';
import { IFeedItem, MetadataItem } from '@app/shared/models/capsule-item.model';

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
