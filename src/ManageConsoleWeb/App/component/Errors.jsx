import React, { Component } from 'react';

export default class Errors extends Component {

    render() {
        return (
            <div>
                <header style={{ margin: "0 auto", textAlign: "center" }}>
                    <h1 className="text-danger">服务器遇见不可理解的问题...</h1>
                    <p className="text-danger" style={{ margin: "0 auto" }}>Page Error!</p>
                </header>
            </div>
        );
    }
}