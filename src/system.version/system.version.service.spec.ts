import { Test, TestingModule } from '@nestjs/testing';
import { SystemVersionService } from './system.version.service';

describe('SystemVersionService', () => {
  let service: SystemVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemVersionService],
    }).compile();

    service = module.get<SystemVersionService>(SystemVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
