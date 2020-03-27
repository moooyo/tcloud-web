import SettingForm from '@/pages/user/components/SettingForm';
import { initUserDetail } from '@/components/user';
import React from 'react';

export default function() {
  return <SettingForm user={initUserDetail} />;
}
