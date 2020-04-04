import React from 'react';
// @ts-ignore
import { fileChangeUrl } from '@/_config/.api';
import FileView from '@/pages/cloud/components/fileView';
class CloudFileView extends React.Component<any, any> {
  render() {
    return (
      <FileView
        type={"pdf"}
        path={fileChangeUrl + "/33"}
      />
    )
  }
}

export default CloudFileView;
