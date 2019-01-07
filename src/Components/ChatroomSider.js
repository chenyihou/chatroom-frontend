import React from 'react';
import {List, Avatar, Spin} from 'antd';
import {Query} from "react-apollo";
import gql from "graphql-tag";

export default()=>(
<Query query = {gql ` { allUsers{ id,username, } } `} >
    {
        ({loading, error, data}) => {
            if (loading) 
                return <Spin/>;
            if (error) 
                return <p>{error}error</p>;
            console.log(data,"data")
            return  (
                <List
                    itemLayout="horizontal"
                    dataSource={data.allUsers}
                    renderItem={item => (
                    <List.Item>
                    <List.Item.Meta
                        avatar={< Avatar icon = "user" / >}
                        title = { < a href = "https://ant.design" > {
                            item.username
                        } < /a>}
                        description={item.description||""}/ > 
                    </List.Item>)} />);
        }
    }
< /Query>)