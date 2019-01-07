import {Query} from "react-apollo";
import gql from "graphql-tag";
import React from 'react';
import { Spin } from 'antd';

export default() => (
    <div style={{display:'flex',alignContent:'center ',justifyContent:'center',height:'100vh'}}>
    <Query query={gql ` { allUsers{ id,username } } `}>
        {({loading, error, data}) => {
            if (loading) 
                return  <Spin />;
            if (error) 
                return <p>{error}error</p>;
            console.log(data)
            return data
                .allUsers
                .map(({id, username}) => (
                    <div key={id}>
                        <p>{username}</p>
                    </div>
                ));
        }}
    </Query>
    </div>
);
