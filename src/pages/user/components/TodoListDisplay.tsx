import React from 'react';
import { Todo, UserDetailInfo } from '@/components/user';
import { Card, Divider } from 'antd';
import style from './user.module.css';
import { createFromIconfontCN } from '@ant-design/icons/es';
import { IconFontCnUrl } from '@/_config/.api';
import moment from 'moment';

const Icon = createFromIconfontCN({
  scriptUrl: IconFontCnUrl,
});

interface props {
  user: UserDetailInfo;
}

interface state {
  todoList: Todo[];
}

class TodoListDisplay extends React.Component<props, state> {
  state = {
    todoList: this.props.user.TodoList,
  };
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

  generateDeleteHandle(id: number) {
    return function() {
      // @ts-ignore
      let todoList = this.state.todoList;
      let index = todoList.findIndex((e: { ID: number }) => e.ID === id);
      if (index !== -1) {
        todoList[index].Finished = !todoList[index].Finished;
        // @ts-ignore
        this.setState({
          todoList: todoList,
        });
      }
    };
  }

  renderTodo = (item: Todo) => {
    return (
      <Card
        hoverable={true}
        className={
          style.todoItem + ' ' + (item.Finished ? style.todoFinishedItem : '')
        }
        size={'small'}
        onClick={this.generateDeleteHandle(item.ID).bind(this)}
      >
        <span
          style={{
            fontSize: 'large',
            marginRight: '10px',
          }}
        >
          <Icon
            type={item.Finished ? 'icon--todo' : this.todo2iconType(item.Level)}
          />
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
    return (
      <div>
        <div className={style.todoList}>
          {this.state.todoList.map(item => {
            return item.Finished ? '' : this.renderTodo(item);
          })}
        </div>
        <Divider
          dashed={true}
          style={{ marginTop: '10px', marginBottom: '10px' }}
        />
        <div className={style.todoListFinished}>
          {this.state.todoList.map(item => {
            return item.Finished ? this.renderTodo(item) : '';
          })}
        </div>
      </div>
    );
  }
}

export default TodoListDisplay;
