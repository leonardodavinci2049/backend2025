import { Test, TestingModule } from '@nestjs/testing';
import { SystemDashboardController } from './system.dashboard.controller';
import { SystemDashboardService } from './system.dashboard.service';

describe('SystemDashboardController', () => {
  let controller: SystemDashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemDashboardController],
      providers: [SystemDashboardService],
    }).compile();

    controller = module.get<SystemDashboardController>(SystemDashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
