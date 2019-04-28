import React, { Component } from 'react';


//分页控件,index表示当前的页码,pageCount代表的是总的页数
export default class Pager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showIndex: 5
        }
    }

    hanldeClick(index) {
        let { pageCount } = this.props;
        if (index <= 0 || index > pageCount) //超出索引不做任何的操作
            return;
        if (this.props.click) {
            this.props.click(index);
        }

    }

    renderPages() {
        //解构赋值
        let indexs = [];
        let { index, pageCount, showCount } = this.props;
        let showIndex = 5;
        for (let i = 1; i <= pageCount; i++) {
            indexs.push(i);
        }
        var startIndex = index - (showCount / 2);
        let spliceStart = startIndex < 0 ? 0 : startIndex + showIndex < pageCount ? startIndex : pageCount - showIndex;
        spliceStart = spliceStart < 0 ? 0 : spliceStart;
        indexs = indexs.splice(spliceStart, showIndex);
        return indexs.map(u => {
            let className = "paginate_button ";
            if (u === index) {
                className += "active";
            }
            return (

                <li onClick={this.hanldeClick.bind(this, u)} className={className}><a href="javascript:void(0)" >{u}</a></li>
            );
        });
    }

    render() {

        return (
            <div className="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
                <ul className="pagination">
                    <li className="paginate_button previous" onClick={this.hanldeClick.bind(this, this.props.index - 1)}>
                        <a href="javascript:void(0)">Previous</a>
                    </li>
                    {this.renderPages()}
                    <li className="paginate_button next" onClick={this.hanldeClick.bind(this, this.props.index + 1)}>
                        <a href="javascript:void(0)">Next</a>
                    </li>
                    <li><span> 当前第{this.props.index}页,总计{this.props.pageCount}页</span></li>
                </ul>
            </div>
        );
    }
}