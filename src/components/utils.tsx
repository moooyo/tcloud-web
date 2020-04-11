import { createFromIconfontCN } from '@ant-design/icons';
import { IconFontCnUrl } from '@/_config/.api';

enum FileType {
  FileTypeOther = 1,
  FileTypePdf,
  FileTypeCsv,
  FileTypeXlsx,
  FileTypeDocx,
  FileTypeMp4,
  FileTypeWebm,
  FileTypeMp3,
  FileTypePng,
  FileTypeJpeg,
  FileTypeGif,
  FileTypeBmp,
  FileTypeJpg,
  FileTypeEnd,
}

function Number2FileType(num: number) {
  switch (num) {
    case FileType.FileTypeCsv:
      return 'csv';
    case FileType.FileTypeDocx:
      return 'docx';
    case FileType.FileTypeMp3:
      return 'mp3';
    case FileType.FileTypeMp4:
      return 'mp4';
    case FileType.FileTypePdf:
      return 'pdf';
    case FileType.FileTypeWebm:
      return 'webm';
    case FileType.FileTypeXlsx:
      return 'xlsx';
    case FileType.FileTypeJpeg:
      return 'jpeg';
    case FileType.FileTypeJpg:
      return 'jpg';
    case FileType.FileTypeGif:
      return 'gif';
    case FileType.FileTypeBmp:
      return 'bmp';
    case FileType.FileTypePng:
      return 'png';
    case FileType.FileTypeOther:
      return 'other';
    default:
      return 'other';
  }
}

enum FileListType {
  Unset,
  Other,
  Music,
  Video,
  Doc,
  Image,
}

const IconFont = createFromIconfontCN({
  scriptUrl: IconFontCnUrl,
});

export { Number2FileType, FileListType, IconFont };
