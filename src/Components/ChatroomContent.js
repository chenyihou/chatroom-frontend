import React from 'react'

import {Comment, List} from 'antd';
export default({data}) => (
    <div style={{overflow:'scroll',height:'60vh'}}>
    <List
    
        className="comment-list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
        <Comment
            actions={item.actions}
            author={item.author}
            avatar={item.avatar}
            content={item.content}
            datetime={item.datetime}/>
    )}/>
    </div>
)