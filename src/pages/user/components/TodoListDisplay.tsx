import React from 'react';
import { initUserDetail, Todo } from '@/components/user';
import { Card, Divider } from 'antd';
import style from './user.module.css';
import { createFromIconfontCN } from '@ant-design/icons/es';
import { IconFontCnUrl } from '@/_config/.api';
import moment from 'moment';

const Icon = createFromIconfontCN({
  scriptUrl: IconFontCnUrl,
});

class TodoListDisplay extends React.Component<any, any> {
  todo2iconType = (type: number) => {
    switch (type) {
      case 0:
        return 'icon--todo-green-copy';
      case 1:
        return 'icon--todo-yellow-copy';
      case 2:
        return 'icon--todo-red-copy';
      default:
        return 'icon--todo';
    }
  };

  renderTodo = (item: Todo) => {
    return (
      <Card hoverable={true} className={style.todoItem} size={'small'}>
        <span
          style={{
            fontSize: 'large',
            marginRight: '10px',
          }}
        >
          <Icon type={this.todo2iconType(item.Level)} />
        </span>
        <span>{item.Name}</span>
        <div
          style={{
            float: 'right',
            display: 'inline-block',
            paddingTop: '2px',
          }}
        >
          {moment(item.EndTime).format('YYYY-MM-DD HH:mm')}
        </div>
      </Card>
    );
  };

  renderTodoFinished = (item: Todo) => {
    return (
      <Card
        className={style.todoItem + ' ' + style.todoFinishedItem}
        size={'small'}
      >
        <span
          style={{
            fontSize: 'large',
            marginRight: '10px',
          }}
        >
          <Icon type={'icon--todo'} />
        </span>
        <span>{item.Name}</span>
        <div
          style={{
            float: 'right',
            display: 'inline-block',
            paddingTop: '2px',
          }}
        >
          {moment(item.EndTime).format('YYYY-MM-DD HH:mm')}
        </div>
      </Card>
    );
  };

  render() {
    let user = initUserDetail;
    return (
      <div>
        <div className={style.todoList}>
          {user.TodoList.map(item => {
            return item.Finished ? '' : this.renderTodo(item);
          })}
        </div>
        <Divider
          dashed={true}
          style={{ marginTop: '10px', marginBottom: '10px' }}
        />
        <div className={style.todoListFinished}>
          {user.TodoList.map(item => {
            return item.Finished ? this.renderTodoFinished(item) : '';
          })}
        </div>
      </div>
    );
  }
}

export default TodoListDisplay;
