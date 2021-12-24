import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import './index.css'
import { withRouter } from 'react-router-dom'
import DeviceList from '@/views/deviceList'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Route } from 'react-router-dom';
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
 
class MyLayout extends Component {

  handleMenu = (menuItem) => {
    const { key } = menuItem
    // console.log(key)
    this.props.history.push(`/home/${key}`)
  }
  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          theme="dark"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo"><h1 className="title">Demo</h1></div>
          <Menu theme="dark" mode="inline" onClick={ this.handleMenu }>
            <SubMenu key="sub1" icon={<VideoCameraOutlined />} title="设备管理">
              <Menu.Item key="deviceList">设备列表</Menu.Item>
              <Menu.Item key="monitor">实时监控</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{minHeight: '100%'}}>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: '100%' }}>
              <Route path="/home/deviceList" component={DeviceList}/>
              <Route path="/home/monitor" component={DeviceList}/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default withRouter(MyLayout)