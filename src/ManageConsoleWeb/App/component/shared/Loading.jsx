import React, { Component } from 'react';



export default class Loading extends Component {
    render() {
        return (
            <div className="loader">
                <div className="loader-inner ball-pulse">
                    <div style={{ backgroundColor:"#74aabe"}}></div>
                    <div style={{ backgroundColor: "#74aabe" }}></div>
                    <div style={{ backgroundColor: "#74aabe" }}></div>
                </div>
            </div>
        );
    }
}