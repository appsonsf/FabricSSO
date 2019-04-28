import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//导入Action
import UserActions from "../../actions/User/";

//导入组件
import EmpTable from "./EmpTable";
import SearchBar from "./SearchBar";

class EmpContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <EmpTable {...this.props.state} Actions={this.props.Actions} />
            </div>
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
            Emp: bindActionCreators(UserActions.Emp, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmpContainer);