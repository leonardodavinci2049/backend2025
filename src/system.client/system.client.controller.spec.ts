import { Test, TestingModule } from '@nestjs/testing';
import { SystemClientController } from './system.client.controller';
import { SystemClientService } from './system.client.service';

describe('SystemClientController', () => {
  let controller: SystemClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemClientController],
      providers: [SystemClientService],
    }).compile();

    controller = module.get<SystemClientController>(SystemClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
