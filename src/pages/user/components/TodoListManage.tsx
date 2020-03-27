import React from 'react';
import { Button, Col, DatePicker, Input, InputNumber, Row, Select } from 'antd';
import { Todo, UserDetailInfo } from '@/components/user';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface props {
  user: UserDetailInfo;
}

function formatterCircle(value: number) {
  if (value === 0) {
    return '不重复';
  } else {
    if (value % 7 === 0) {
      return (value / 7).toString() + '周一次';
    }
    return value.toString() + '天一次';
  }
}

interface ManagerTodoItem {
  status: number;
  data: Todo;
}

interface state {
  list: ManagerTodoItem[];
}

class TodoListManage extends React.Component<props, state> {
  state = {
    list: this.props.user.TodoList.map(e => {
      let tmp: ManagerTodoItem = {
        status: 0,
        data: e,
      };
      return tmp;
    }),
  };

  renderTodoItem = (item: ManagerTodoItem) => {
    if (item.status !== -1) {
      return (
        <div style={{ marginBottom: '10px' }}>
          <Row gutter={5}>
            <Col span={6}>
              <Input placeholder={'名称'} value={item.data.Name} />
            </Col>
            <Col span={9}>
              <RangePicker />
              <InputNumber style={{ display: 'none' }} />
              <InputNumber style={{ display: 'none' }} />
            </Col>
            <Col span={3}>
              <Select style={{ width: '100%' }}>
                <Option value={1}>普通</Option>
                <Option value={2}>一般</Option>
                <Option value={3}>重要</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select style={{ width: '100%' }}>
                <Option value={0}>不重复</Option>
                {Array.from({ length: 15 }, (x, i) => i).map(e => {
                  if (e === 0) {
                    return <></>;
                  } else {
                    return <Option value={e}>{e.toString() + '天一次'}</Option>;
                  }
                })}
              </Select>
            </Col>
            <Col span={2}>
              <Button danger={true} style={{ width: '100%' }} type={'link'}>
                删除
              </Button>
            </Col>
          </Row>
        </div>
      );
    } else {
      return <></>;
    }
  };

  render() {
    return (
      <div>
        <p>任务清单管理</p>
        {this.state.list.map(e => this.renderTodoItem(e))}
      </div>
    );
  }
}

export default TodoListManage;
