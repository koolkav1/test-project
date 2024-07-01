import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TextService {
  private readonly logger = new Logger(TextService.name);
  private readonly filePath = this.getFilePath();

  private getFilePath(): string {
    const devPath = path.resolve(__dirname, '..', 'data', 'world-cities.txt');
    const prodPath = path.resolve(__dirname, '..', '..', 'data', 'world-cities.txt');
    const selectedPath = fs.existsSync(devPath) ? devPath : prodPath;

    this.logger.log(`Using file path: ${selectedPath}`);
    return selectedPath;
  }

  private readFile(): string[] {
    this.logger.log(`Reading file: ${this.filePath}`);

    if (!fs.existsSync(this.filePath)) {
      throw new Error(`File not found: ${this.filePath}`);
    }

    const data = fs.readFileSync(this.filePath, 'utf8');
    return data.split('\n').filter(line => line.trim() !== '');
  }

  findAll(page?: number, pageSize?: number, search?: string, filter?: string): { data: string[], total: number } {
    let strings = this.readFile();

    if (search) {
      strings = strings.filter(str => str.includes(search));
    }

    if (filter) {
      strings = strings.filter(str => str.startsWith(filter));
    }

    const total = strings.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const data = strings.slice(startIndex, endIndex);

    return { data, total };
  }
}
