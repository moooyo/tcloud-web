import { FileInfo } from '@/pages/cloud/components/file';
import { routerArgs } from '@/pages/cloud/components/fileAction';
import { tag } from '@/pages/practice/components/problem';

interface course {
  ID: number;
  Name: string;
  Tags: tag[];
  StartTime: number;
  EndTime: number;
  Description: string;
  FileList: FileInfo[];
  FilePath: routerArgs;
}

interface courseNotice {
  Title: string;
  Description: string;
  Level: number;
  Time: number;
}

interface courseNoticeRecord {
  ID: number;
  Title: string;
  Description: string;
  Level: number;
  Time: number;
  Class: number[];
}

export { course, courseNotice, courseNoticeRecord };
