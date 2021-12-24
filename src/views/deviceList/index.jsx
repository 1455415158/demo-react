import React, { Component, Fragment } from 'react'
import { Table, Button, Switch, Space, Input, Modal, Form, Select, TimePicker, Typography, Tooltip, message  } from 'antd';
import moment from 'moment';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { getDeviceList, addDeviceRequest, deleteDeviceRequest, changeStatusRequest, upadteDeviceRequest } from '@/api/device.js'

const { Search } = Input;
const { Option } = Select
const { Text } = Typography;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 20 },
};

export default class DeviceList extends Component {

  // 表格格式
  columns = [
    {
      title: '索引',
      dataIndex: 'id',
      key: 'id',
      // render: text => <a>{text}</a>,
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '所属地区',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: '运行时间',
      dataIndex: 'begin',
      key: 'begin',
      render: (text, record, index) => {return text + '至' + record.end}
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record, index) => { return <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={text} onChange={() => this.handleChangeStatus(record.id)}/> }
    },
    {
      title: '在线',
      dataIndex: 'online',
      key: 'online',
      render: (text, record, index) => { return <Switch checkedChildren="在线" unCheckedChildren="离线" defaultChecked={text} disabled={true}/> }
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => {
        return (
          <Space>
            <Button type="primary" shape="circle" icon={<EditFilled />} onClick={() => this.editDevice(record)}/>
            <Button type="primary" shape="circle" icon={<DeleteFilled />} onClick={() => this.handleDeleteDevice(record.id)} danger/>
          </Space>
        )
      }
    },
  ]

  // 状态
  state = {
    deviceList: [],
    isModalVisible: false,
    modelType: 'null',
    updateDevice: null,
  }

  
  // 初始化
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    let res = await getDeviceList()
    this.setState({deviceList: res.data})
    console.log(this.state.deviceList)
  }

  // 查找设备
  onSearch = () => {

  }

  // 表单Ref
  formRef = React.createRef()
  // 提交表单
  handleAddForm = async (form) => {
    
  }

  // 修改设备点击事件
  editDevice = (record) => {
    this.setState({isModalVisible: true, modelType: 'edit', updateDevice: record})
    let form = this.formRef
    form.current.setFieldsValue({
      name: record.name,
      type: record.type,
      region: record.region,
      begin: moment(record.begin, 'HH:mm:ss'),
      end: moment(record.end, 'HH:mm:ss')
    })
  }


  // Modal确认事件
  handleModalSubmit = () => {
    let form = this.formRef 
    form.current.validateFields().then(async (values) => {
      const begin = values.begin.format('HH:mm:ss')
      const end = values.end.format('HH:mm:ss')
      let req = { ...values, begin, end}
      let res
      if(this.state.modelType == 'add'){
        res = await addDeviceRequest(req)
      } else if (this.state.modelType == 'edit'){
        req = {...req, id: this.state.updateDevice.id, status: this.state.updateDevice.status}
        res = await upadteDeviceRequest(req)
      }
      if(res.status == 200){
        this.state.modelType == 'add' ? message.success('添加设备成功') : message.success('修改设备成功')
        this.setState({isModalVisible: false})
        this.init()
      } else {
        this.state.modelType == 'add' ? message.error('添加设备失败') : message.error('修改设备失败')
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  handleCancel = () => {
    this.setState({isModalVisible: false})
  }

  onTypeChange = () => {

  }

  // 删除设备
  handleDeleteDevice = async (deviceId) => {
    const res = await deleteDeviceRequest(deviceId)
    if (res.status == 200) {
      message.success('删除成功')
      this.init()
    } else {
      message.error('删除失败')
    }
  }

  // 修改设备状态
  handleChangeStatus = async (deviceId) => {
    let res = await changeStatusRequest(deviceId)
    console.log(res)
    if (res.status == 200) {
      message.success('修改状态成功')
    } else {
      message.error('修改状态失败')
    }
  }

  handleAddDevice = () => {
    if(this.state.modelType == 'edit') {
      let form = this.formRef
      form.current.resetFields()
    }
    this.setState({isModalVisible: true, modelType: 'add'})
  }


  render() {
    return (
      <Fragment>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space size="large">
            <Search placeholder="请输入设备名称" onSearch={this.onSearch} style={{ width: 400 }} size="large"/>
            <Button type="primary" size="large" onClick={this.handleAddDevice}>添加设备</Button>
          </Space>
          <Table dataSource={this.state.deviceList} columns={this.columns} rowKey={record => record.id} />
        </Space>
        <Modal 
          title="填写设备信息" 
          visible={this.state.isModalVisible}  
          onOk={this.handleModalSubmit} 
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
          forceRender = {true}
        >
           <Form {...layout} ref={this.formRef} name="新增设备表单" onFinish={this.handleAddForm}>
           <Form.Item
              label="名称"
              name="name"
              rules={[{ required: true, message: '请输入名称！' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="类型"
              rules={[
                {
                  required: true,
                  message: '请选择类型！'
                },
              ]}
            >
              <Select
                placeholder="请选择类型"
                onChange={this.onTypeChange}
                allowClear
              >
                <Option value="类型一">类型一</Option>
                <Option value="类型二">类型二</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="所属地区"
              name="region"
              rules={[{ required: true, message: '请输入设备所属地区！' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="工作时间" required>
              <Space>
                <Form.Item
                  name="begin"
                  rules={[{ required: true, message: '请选择工作开始时间！' }]}
                  noStyle
                >
                  <TimePicker format='HH:mm:ss'/>
                </Form.Item>
                <Tooltip>至</Tooltip>
                <Form.Item
                  name="end"
                  rules={[{ required: true, message: '请选择工作结束时间！' }]}
                  noStyle
                >
                  <TimePicker format='HH:mm:ss'/>
                </Form.Item>
              </Space>
            </Form.Item>
           </Form>
        </Modal>
      </Fragment>
    )
  }
}
