interface tag {
  ID: number;
  Name: string;
}
interface practice {
  ID: number;
  OJ: number;
  Title: string;
  URL: string;
  Total: number;
  AcRate: number;
  Tags: tag[];
  Solved: boolean;
}

interface practiceRecord {
  ID: number;
  OJ: number;
  Title: string;
  URL: string;
  Total: number;
  AcRate: number;
  Tags: tag[];
  Class: number[];
  Course: number[];
}

export { practice, tag, practiceRecord };
