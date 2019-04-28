import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//导入Action
import ClientActions from "../../actions/Client/";

//导入组件
import ResourceTable from "./ResourceTable";

class ResourceContainer extends Component {
    render() {
        return (
            <ResourceTable {...this.props.state} Actions={this.props.Actions}/>
        );
    }
}
function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: {
            Client: bindActionCreators(ClientActions.Client, dispatch),
            Resource: bindActionCreators(ClientActions.Resources, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceContainer);