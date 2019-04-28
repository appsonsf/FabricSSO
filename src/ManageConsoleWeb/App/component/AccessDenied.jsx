import React, { Component } from 'react';

export default class AccessDenied extends Component {

    render() {
        return (
            <div>
                <header style={{ margin: "0 auto", textAlign: "center" }}>
                    <h1 className="text-danger">禁止访问,请联系管理员以获得权限!</h1>
                    <p className="text-danger" style={{ margin: "0 auto" }}>You do not have access to this resource.</p>
                </header>
            </div>
        );
    }
}