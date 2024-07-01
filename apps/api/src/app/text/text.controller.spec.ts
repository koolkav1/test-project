import { Test, TestingModule } from '@nestjs/testing';
import { TextController } from './text.controller';
import { TextService } from './text.service';

describe('TextController', () => {
  let controller: TextController;
  let service: TextService;

  const mockTextService = {
    findAll: jest.fn().mockImplementation((page: number, pageSize: number, search?: string, filter?: string) => {
      const data = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'];
      const filteredData = data.filter(item => {
        if (search && !item.includes(search)) return false;
        if (filter && !item.startsWith(filter)) return false;
        return true;
      });
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = filteredData.slice(startIndex, endIndex);
      return { data: paginatedData, total: filteredData.length };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextController],
      providers: [
        {
          provide: TextService,
          useValue: mockTextService,
        },
      ],
    }).compile();

    controller = module.get<TextController>(TextController);
    service = module.get<TextService>(TextService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all strings', () => {
    const result = controller.findAll(1, 10);
    expect(result.data).toEqual(['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew']);
    expect(result.total).toBe(8);
  });

  it('should return paginated results', () => {
    const result = controller.findAll(1, 5);
    expect(result.data).toEqual(['apple', 'banana', 'cherry', 'date', 'elderberry']);
    expect(result.total).toBe(8);
  });

  it('should filter results based on search term', () => {
    const result = controller.findAll(1, 10, 'ap');
    expect(result.data).toEqual(['apple', 'grape']);
    expect(result.total).toBe(2);
  });

  it('should filter results based on filter term', () => {
    const result = controller.findAll(1, 10, undefined, 'a');
    expect(result.data).toEqual(['apple']);
    expect(result.total).toBe(1);
  });
});
