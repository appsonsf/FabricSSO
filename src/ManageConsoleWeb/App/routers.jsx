import React, { Component } from 'react';
import Layout from "./component/shared/layout"
import { Route, Link } from 'react-router-dom';

//导入组件
import ClientContainer from "./component/ClientManage/ClientContainer";
import RoleContainer from "./component/RoleManage/RoleContainer";
import RoleUsersTable from "./component/RoleUsersManage/RoleUsersTable";
import ResourceContainer from "./component/ResourceManager/ResourceContainer"
import UserContainer from "./component/UserManager/UserContainer"
import Index from "./component/Index";
import AccessDenied from "./component/AccessDenied";
import NotFound from "./component/NotFound";
import Errors from "./component/Errors";
import EmpContainer from "./component/Empmanager/EmpContainer";
import SyncContainer from "./component/SyncContainer";
import ContactGroupTable from "./component/ContactGroup/ContactGroupTable";

export const routes =
    <Layout>
        <Route exact path="/" component={Index} />
        <Route path="/ReactClientManage" component={ClientContainer} />
        <Route path="/reactRoleManager" component={RoleContainer} />
        <Route path="/reactRoleUsersManage" component={RoleUsersTable} />
        <Route path="/reactResourceManager" component={ResourceContainer} />
        <Route path="/ReactUserManager" component={UserContainer} />
        <Route path="/ReactEmpManager" component={EmpContainer} />
        <Route path="/Sync" component={SyncContainer} />
        <Route path="/contactgroup" component={ContactGroupTable} />
        <Route path="/Account/AccessDenied" component={AccessDenied} />
        <Route path="/NotFound" component={NotFound} />
        <Route path="/error" component={Errors} />
    </Layout>;