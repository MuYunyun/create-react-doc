/* eslint-disable global-require */
import React from 'react';
import Loading from './component/Loading';
import './index.less';

export default function (Lazyload, props) {
  const LoadableComponent = Lazyload({
    component: () => import('./routes/Pages'),
    LoadingComponent: Loading,
  });

  // routing load component
  if (props.routeData && props.routeData.length > 0) {
    props.routeData.map((item) => {
      item.component = LoadableComponent;
      return item;
    });
  }

  // eslint-disable-next-line no-undef
  const { theme } = DOCSCONFIG || {};

  // todo: if there is requirement for custom theme. create-react-doc will provide the ability to use theme as node_modules.
  // and provide the theme template.
  // eslint-disable-next-line import/no-dynamic-require
  const CustomTheme = require(`./internal-theme/${theme}`).default;

  return (
    // use custom theme here.
    <CustomTheme {...props} />
  );
}
