import React, { useEffect } from 'react';
import { Layout } from 'antd';
import MainHeaderLayout from '@/pages/components/MainHeaderLayout';

const { Content } = Layout;

const CloudLayout = (props: any) => {
  return <>{props.children}</>;
};

export default CloudLayout;
