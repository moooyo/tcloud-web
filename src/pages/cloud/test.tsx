import React from 'react';
// @ts-ignore
import { fileChangeUrl } from '@/_config/.api';
import FileView from '@/pages/cloud/components/fileView';
import ShareConfirm from './components/share';
class CloudFileView extends React.Component<any, any> {
  render() {
    return <ShareConfirm></ShareConfirm>;
  }
}

export default CloudFileView;
