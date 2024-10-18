import { Test, TestingModule } from '@nestjs/testing';
import { BeverageService } from './beverage.service';

describe('BeverageService', () => {
  let service: BeverageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeverageService],
    }).compile();

    service = module.get<BeverageService>(BeverageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
