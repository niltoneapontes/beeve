import { Test, TestingModule } from '@nestjs/testing';
import { BeverageController } from './beverage.controller';

describe('BeverageController', () => {
  let controller: BeverageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeverageController],
    }).compile();

    controller = module.get<BeverageController>(BeverageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
