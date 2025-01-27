import { Test, TestingModule } from '@nestjs/testing';
import { SystemDashboardService } from './system.dashboard.service';

describe('SystemDashboardService', () => {
  let service: SystemDashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemDashboardService],
    }).compile();

    service = module.get<SystemDashboardService>(SystemDashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
