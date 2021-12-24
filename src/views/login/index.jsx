import React, { Component } from 'react'
import { reqUserInfo } from "@/api/user.js"
import './index.css'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { setUserToken } from '@/store/actions'


class Login extends Component {

  handleLogin = async (formValue) => {
    // reqUserInfo({username: 'admin', password: "123456"})
    let res = await reqUserInfo(formValue)
    if(res.status == 200){
      message.success('登录成功');
      this.props.setUserToken(res.data.token)
      this.props.history.push('/home')
    } else {
      message.error('登录失败');
    }
    // console.log(formValue)
  }

  render() {
    return (
      <div className="login_page">
        <div className="login-box">
          <h2 className="login-title">登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.handleLogin}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}


export default connect((state) => state.user, { setUserToken })(Login)