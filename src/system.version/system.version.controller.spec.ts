import { Test, TestingModule } from '@nestjs/testing';
import { SystemVersionController } from './system.version.controller';
import { SystemVersionService } from './system.version.service';

describe('SystemVersionController', () => {
  let controller: SystemVersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemVersionController],
      providers: [SystemVersionService],
    }).compile();

    controller = module.get<SystemVersionController>(SystemVersionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
