import React from 'react';
import ChatroomContent from '../Components/ChatroomContent';
import moment from 'moment';
import {Spin, Avatar} from 'antd';
import {Query} from "react-apollo";
import gql from "graphql-tag";



export default () => (
    <Query query={gql ` { allMessages{
        id
        text
        created_at
        user{
          id
          username
        }
      } } `}>
        {({loading, error, data}) => {
            if (loading) 
                return  <Spin />;
            if (error) 
                return <p>{error}error</p>;
            console.log(data)
            data=data
                    .allMessages
                    .map(({id, text,user,created_at}) => (
                        {author:user.username,
                        content:text,
                        avatar: (<Avatar
                            icon='user'/ >),
                        datetime:moment(parseInt(created_at)).fromNow()
                        }));
            return <ChatroomContent data={data}/>
        }}
    </Query>
)

