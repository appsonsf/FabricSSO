import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from 'react-redux';
import { routes } from './routers';
import { BrowserRouter as Router, Route, Link, StaticRouter } from 'react-router-dom'
import 'babel-polyfill';
import "core-js/es6/map";
import "core-js/es6/set";

import Store from './store/'

function renderApp() {
    ReactDOM.render(
        <AppContainer>
            <Provider store={Store}>
                <Router children={routes} />
            </Provider>
        </AppContainer>,
        document.getElementById("react-app")
    );
}
renderApp();

if (module.hot) {
    module.hot.accept(() => {
        renderApp();
    });
}