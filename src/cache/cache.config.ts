import { Injectable } from '@nestjs/common';
import {
  RedisOptionsFactory,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigService implements RedisOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createRedisOptions(): Promise<RedisModuleOptions> {
    return {
      config: {
        // host: this.configService.get<string>('REDIS_HOSTNAME'),
        // port: this.configService.get<number>('REDIS_PORT')
        host: 'localhost',
        port: 6379
      },
    };
  }
}