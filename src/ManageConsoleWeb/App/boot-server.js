import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Provider } from 'react-redux';

import { renderToString } from 'react-dom/server'
import Store from './store/'
import { createServerRenderer } from 'aspnet-prerendering';
import { routes } from "./routers";
import { BrowserRouter as Router, Route, Link, StaticRouter } from 'react-router-dom'

export default createServerRenderer(params => {
    return new Promise((resolvue, reject) => {
        const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
        const routerContext = {};

        // 服务器端渲染
        const html = renderToString(
            <Provider store={Store}>
                <StaticRouter basename={basename} context={routerContext} location={params.location.path} children={routes} />
            </Provider>
        );

        resolvue({ html: html });
    });
})