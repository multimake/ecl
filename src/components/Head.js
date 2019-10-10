import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router";
import queryString from 'query-string';

import settings from "project/settings.yml";

const extraSettings = settings.big_picture.extra || {};
const thirdSettings = settings.big_picture.third || {};
const allowedFormats = ["card-mode", extraSettings.url, thirdSettings.url].filter((x) => x);

const isCanonical = (pathname) => {
  const params = queryString.parse(pathname.split("/").pop());
  const paramsCount = Object.keys(params).length;

  return paramsCount === 0 ||
    (paramsCount === 1 && allowedFormats.includes(params.format)) ||
    (paramsCount === 1 && "selected" in params) ||
    (paramsCount === 2 && "selected" in params && allowedFormats.includes(params.format));
}

const Head = ({ location }) => {
  const indexTag = isCanonical(location.pathname) ?
    <link rel="canonical" href={window.location.href}/> :
    <meta name="robots" content="noindex"/>;

  return ReactDOM.createPortal(indexTag, document.head);
};

export default withRouter(Head);