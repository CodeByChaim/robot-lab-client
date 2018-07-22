import { Part } from './part.model';

export class Robot {
  id: number;
  name: string;
  type: string;
  age: number;
  parts: Array<InUsePart>;
}

export class InUsePart {
  condition: number;  // range: 0-100
  partId?: number;
  part?: Part;
}
