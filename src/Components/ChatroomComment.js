import {
    Comment,
    Avatar,
    Form,
    Button,
    message,
    Input
} from 'antd';
import React from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";



const TextArea = Input.TextArea;


const Editor = ({onChange, onSubmit, value}) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button
                htmlType="submit"
                onClick={onSubmit}
                type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);

class CommentCom extends React.Component {
    state = {
        value: ''
    }

    handleSubmit =async () => {
        const {send}=this.props
        if(await send({variables:{text:this.state.value}})){
            message.success('Message is sent')
            this.setState({value:''})
        }
        else {
            message.error('Message is not sent')
        }
        
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    render() {
        const {  value} = this.state;

        return (
            <div>
                <Comment
                    avatar={(<Avatar
                    icon='user'/>)}
                    content={(<Editor
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    value={value}/>)}/>
            </div>
        );
    }
}

const COMMENT = gql`
mutation ($text:String!){
    createMessage( text: $text){
        id
        text
        user{
          id
          username
        }
        created_at
      }
  }
`;

const ALL_MESSAGES=gql` { allMessages{
    id
    text
    created_at
    user{
      id
      username
    }
  } } `

const ex=()=>(<Mutation mutation={COMMENT} update={(cache, { data: { createMessage } }) => {
    const  {allMessages}  = cache.readQuery({ query: ALL_MESSAGES });
    console.log(createMessage)
    cache.writeQuery({
      query: ALL_MESSAGES,
      data: { allMessages: allMessages.concat([createMessage]) },
    });
  }}>
      {(createMessage, { data }) => (
          <CommentCom send={createMessage} />
      )}
    </Mutation>)


export default ex