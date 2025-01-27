import { Test, TestingModule } from '@nestjs/testing';
import { SystemClientService } from './system.client.service';

describe('SystemClientService', () => {
  let service: SystemClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemClientService],
    }).compile();

    service = module.get<SystemClientService>(SystemClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
