import MainHeaderLayout from '@/components/MainHeaderLayout';

import React from 'react';

export default function(props: any) {
  return (
    <>
      <MainHeaderLayout />
      {props.children}
    </>
  );
}