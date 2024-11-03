import { Counter, Histogram } from 'prom-client';

export class observabilityMethods {
  constructor() {}

  static counterSuccess = new Counter({
    name: 'http_requests_users_success',
    help: 'Contagem de requests para o controller de usuários',
  });

  static counterFailed = new Counter({
    name: 'http_requests_users_failed',
    help: 'Contagem de requests para o controller de usuários',
  });

  static counterBeverageSuccess = new Counter({
    name: 'http_requests_beverages_success',
    help: 'Contagem de requests para o controller de bebidas',
  });

  static counterBeverageFailed = new Counter({
    name: 'http_requests_beverages_failed',
    help: 'Contagem de requests para o controller de bebidas',
  });

  static usersPostResponseTime = new Histogram({
    name: 'http_response_time_post_users',
    help: 'Duration of Users Post route requests in seconds',
    buckets: [1, 2, 5, 10, 20, 30, 40, 50, 500, 1000, 2000, 5000, 10000],
  });

  static usersPutResponseTime = new Histogram({
    name: 'http_response_time_put_users',
    help: 'Duration of Users Put route requests in seconds',
    buckets: [1, 2, 5, 10, 20, 30, 40, 50, 500, 1000, 2000, 5000, 10000],
  });

  static usersDeleteResponseTime = new Histogram({
    name: 'http_response_time_delete_users',
    help: 'Duration of Users Delete route requests in seconds',
    buckets: [1, 2, 5, 10, 20, 30, 40, 50, 500, 1000, 2000, 5000, 10000],
  });

  static beveragesPostResponseTime = new Histogram({
    name: 'http_response_time_post_beverages',
    help: 'Duration of beverages Post route requests in seconds',
    buckets: [1, 2, 5, 10, 20, 30, 40, 50, 500, 1000, 2000, 5000, 10000],
  });

  static beveragesPutResponseTime = new Histogram({
    name: 'http_response_time_put_beverages',
    help: 'Duration of beverages Put route requests in seconds',
    buckets: [1, 2, 5, 10, 20, 30, 40, 50, 500, 1000, 2000, 5000, 10000],
  });

  static beveragesGetResponseTime = new Histogram({
    name: 'http_response_time_get_beverages',
    help: 'Duration of beverages Put route requests in seconds',
    buckets: [1, 2, 5, 10, 20, 30, 40, 50, 500, 1000, 2000, 5000, 10000],
  });

  static beveragesDeleteResponseTime = new Histogram({
    name: 'http_response_time_delete_beverages',
    help: 'Duration of beverages Delete route requests in seconds',
    buckets: [1, 2, 5, 10, 20, 30, 40, 50, 500, 1000, 2000, 5000, 10000],
  });
}
