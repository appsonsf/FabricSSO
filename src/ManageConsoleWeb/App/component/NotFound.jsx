import React, { Component } from 'react';

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <header style={{ margin: "0 auto", textAlign: "center" }}>
                    <h1 className="text-danger">资源未找到,请输入正确的URL</h1>
                    <p className="text-danger" style={{ margin: "0 auto" }}>Page Not Found!</p>
                </header>
            </div>
        );
    }
}