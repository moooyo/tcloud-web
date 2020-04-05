enum FileType {
  FileTypeOther,
  FileTypePdf,
  FileTypeCsv,
  FileTypeXlsx,
  FileTypeDocx,
  FileTypeMp4,
  FileTypeWebm,
  FileTypeMp3,
}

function Number2FileType(num: number) {
  switch (num) {
    case FileType.FileTypeCsv:
      return "csv"
    case FileType.FileTypeDocx:
      return "docx"
    case FileType.FileTypeMp3:
      return "mp3"
    case FileType.FileTypeMp4:
      return "mp4"
    case FileType.FileTypePdf:
      return "pdf"
    case FileType.FileTypeWebm:
      return "webm"
    case FileType.FileTypeXlsx:
      return "xlsx"
    case FileType.FileTypeOther:
      return "other"
    default:
      return "other"
  }
}

export {Number2FileType}
