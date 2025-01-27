import { Test, TestingModule } from '@nestjs/testing';
import { SystemEmailsService } from './system.emails.service';

describe('SystemEmailsService', () => {
  let service: SystemEmailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemEmailsService],
    }).compile();

    service = module.get<SystemEmailsService>(SystemEmailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
