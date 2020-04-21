import React from 'react';
import { history } from 'umi';

export default (props: any) => {
  history.push('/cloud');
  return <div>Hello</div>;
};
