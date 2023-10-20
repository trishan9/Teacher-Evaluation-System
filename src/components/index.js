import React from "react";

const NavBar = React.lazy(() => import('./NavBar'));
const Surveys = React.lazy(() => import('./Surveys'));
const SideNav = React.lazy(() => import('./SideNav'));
const Footer = React.lazy(() => import('./Footer'));
const LoginForm = React.lazy(() => import('./Login'));
const History = React.lazy(() => import('./History'));

export { NavBar, Surveys, SideNav, Footer, LoginForm, History }