import React from 'react';
import ChatroomHeader from '../Components/ChatroomHeader'
import ChatroomSider from '../Components/ChatroomSider'
import ChatroomComment from '../Components/ChatroomComment'
import ChatroomContentContainer from '../Container/ChatroomContentContainer'
import {Layout} from 'antd';

const {Header, Footer, Sider, Content} = Layout;

// let userList=[{id:1,name:'a',description:'usera'},{id:2,name:'b',description:'userb'},{id:1,name:'a',description:'usera'},{id:2,name:'b',description:'userb'},{id:1,name:'a',description:'usera'},{id:2,name:'b',description:'userb'},{id:1,name:'a',description:'usera'},{id:2,name:'b',description:'userb'},{id:1,name:'a',description:'usera'},{id:2,name:'b',description:'userb'},{id:1,name:'a',description:'usera'},{id:2,name:'b',description:'userb'},{id:1,name:'a',description:'usera'},{id:2,name:'b',description:'userb'}]

export default() => (
    <Layout style={{height:'100vh',}}>
        <Sider style={{backgroundColor:'transparent', overflowY:'scroll'}}><ChatroomSider/></Sider>
        <Layout>
            <Header style={{backgroundColor:'transparent'}}><ChatroomHeader/></Header>
            <Content ><ChatroomContentContainer /></Content>
            <Footer><ChatroomComment name="name"/></Footer>
        </Layout>
    </Layout>
)