import { Test, TestingModule } from '@nestjs/testing';
import { TextService } from './text.service';
import mockFs from 'mock-fs';

describe('TextService', () => {
  let service: TextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextService],
    }).compile();

    service = module.get<TextService>(TextService);

    mockFs({
      'apps/api/src/app/data': {
        'world-cities.txt': 'apple\nbanana\ncherry\ndate\nelderberry\nfig\ngrape\nhoneydew',
      },
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should read all strings from the file', () => {
    const result = service.findAll(1, 10);
    expect(result.data).toEqual(['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew']);
    expect(result.total).toBe(8);
  });

  it('should return paginated results', () => {
    const result = service.findAll(1, 5);
    expect(result.data).toEqual(['apple', 'banana', 'cherry', 'date', 'elderberry']);
    expect(result.total).toBe(8);
  });

  it('should filter results based on search term', () => {
    const result = service.findAll(1, 10, 'ap');
    expect(result.data).toEqual(['apple', 'grape']);
    expect(result.total).toBe(2);
  });

  it('should filter results based on filter term', () => {
    const result = service.findAll(1, 10, undefined, 'a');
    expect(result.data).toEqual(['apple']);
    expect(result.total).toBe(1);
  });
});
