import React from 'react';
import { history } from 'umi';

const userSessionKey = 'SESSION_ID';

class CheckLoginStatus extends React.Component<any, any> {
  componentDidMount(): void {
    let cookies = document.cookie.split(';');
    cookies = cookies.map(value => value.trim());
    let cookiesMap = new Map();
    for (let str of cookies) {
      let split = str.indexOf('=');
      let key = str.slice(0, split);
      let value = str.slice(split + 1);
      cookiesMap.set(key, value);
    }
    if (cookiesMap.get(userSessionKey) === undefined) {
      history.push('/login');
    }
  }

  render() {
    return null;
  }
}

export { CheckLoginStatus };
