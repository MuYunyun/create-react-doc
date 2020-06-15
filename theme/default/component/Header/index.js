import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import styles from './index.less';

const SVGGithub = (
  <svg width="256px" height="250px" viewBox="0 0 256 250">
    <path d="M128.00106,0 C57.3172926,0 0,57.3066942 0,128.00106 C0,184.555281 36.6761997,232.535542 87.534937,249.460899 C93.9320223,250.645779 96.280588,246.684165 96.280588,243.303333 C96.280588,240.251045 96.1618878,230.167899 96.106777,219.472176 C60.4967585,227.215235 52.9826207,204.369712 52.9826207,204.369712 C47.1599584,189.574598 38.770408,185.640538 38.770408,185.640538 C27.1568785,177.696113 39.6458206,177.859325 39.6458206,177.859325 C52.4993419,178.762293 59.267365,191.04987 59.267365,191.04987 C70.6837675,210.618423 89.2115753,204.961093 96.5158685,201.690482 C97.6647155,193.417512 100.981959,187.77078 104.642583,184.574357 C76.211799,181.33766 46.324819,170.362144 46.324819,121.315702 C46.324819,107.340889 51.3250588,95.9223682 59.5132437,86.9583937 C58.1842268,83.7344152 53.8029229,70.715562 60.7532354,53.0843636 C60.7532354,53.0843636 71.5019501,49.6441813 95.9626412,66.2049595 C106.172967,63.368876 117.123047,61.9465949 128.00106,61.8978432 C138.879073,61.9465949 149.837632,63.368876 160.067033,66.2049595 C184.49805,49.6441813 195.231926,53.0843636 195.231926,53.0843636 C202.199197,70.715562 197.815773,83.7344152 196.486756,86.9583937 C204.694018,95.9223682 209.660343,107.340889 209.660343,121.315702 C209.660343,170.478725 179.716133,181.303747 151.213281,184.472614 C155.80443,188.444828 159.895342,196.234518 159.895342,208.176593 C159.895342,225.303317 159.746968,239.087361 159.746968,243.303333 C159.746968,246.709601 162.05102,250.70089 168.53925,249.443941 C219.370432,232.499507 256,184.536204 256,128.00106 C256,57.3066942 198.691187,0 128.00106,0 Z M47.9405593,182.340212 C47.6586465,182.976105 46.6581745,183.166873 45.7467277,182.730227 C44.8183235,182.312656 44.2968914,181.445722 44.5978808,180.80771 C44.8734344,180.152739 45.876026,179.97045 46.8023103,180.409216 C47.7328342,180.826786 48.2627451,181.702199 47.9405593,182.340212 Z M54.2367892,187.958254 C53.6263318,188.524199 52.4329723,188.261363 51.6232682,187.366874 C50.7860088,186.474504 50.6291553,185.281144 51.2480912,184.70672 C51.8776254,184.140775 53.0349512,184.405731 53.8743302,185.298101 C54.7115892,186.201069 54.8748019,187.38595 54.2367892,187.958254 Z M58.5562413,195.146347 C57.7719732,195.691096 56.4895886,195.180261 55.6968417,194.042013 C54.9125733,192.903764 54.9125733,191.538713 55.713799,190.991845 C56.5086651,190.444977 57.7719732,190.936735 58.5753181,192.066505 C59.3574669,193.22383 59.3574669,194.58888 58.5562413,195.146347 Z M65.8613592,203.471174 C65.1597571,204.244846 63.6654083,204.03712 62.5716717,202.981538 C61.4524999,201.94927 61.1409122,200.484596 61.8446341,199.710926 C62.5547146,198.935137 64.0575422,199.15346 65.1597571,200.200564 C66.2704506,201.230712 66.6095936,202.705984 65.8613592,203.471174 Z M75.3025151,206.281542 C74.9930474,207.284134 73.553809,207.739857 72.1039724,207.313809 C70.6562556,206.875043 69.7087748,205.700761 70.0012857,204.687571 C70.302275,203.678621 71.7478721,203.20382 73.2083069,203.659543 C74.6539041,204.09619 75.6035048,205.261994 75.3025151,206.281542 Z M86.046947,207.473627 C86.0829806,208.529209 84.8535871,209.404622 83.3316829,209.4237 C81.8013,209.457614 80.563428,208.603398 80.5464708,207.564772 C80.5464708,206.498591 81.7483088,205.631657 83.2786917,205.606221 C84.8005962,205.576546 86.046947,206.424403 86.046947,207.473627 Z M96.6021471,207.069023 C96.7844366,208.099171 95.7267341,209.156872 94.215428,209.438785 C92.7295577,209.710099 91.3539086,209.074206 91.1652603,208.052538 C90.9808515,206.996955 92.0576306,205.939253 93.5413813,205.66582 C95.054807,205.402984 96.4092596,206.021919 96.6021471,207.069023 Z" />
  </svg>
);

export default class Header extends PureComponent {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
  renderTopMenu(menuSource, pathname) {
    if (menuSource.length > 1) {
      menuSource = menuSource.sort((a, b) => {
        if (a.sort < b.sort) return -1;
        if (a.sort > b.sort) return 1;
        return 0;
      });
    }
    return menuSource.map((item, index) => {
      if (!item) return null;
      if (item.mdconf && item.mdconf.visible === false) return null;

      const url = item.mdconf && (item.mdconf.github || item.mdconf.url);
      if (url) {
        return (
          <a key={index} target="_blank" rel="noopener noreferrer" href={url}>
            {item.mdconf.github && SVGGithub}{item.mdconf.title && <span>{item.mdconf.title}</span>}
          </a>
        );
      }
      if (item.props && item.props.isEmpty === true && (item.mdconf && !item.mdconf.redirect)) return null;

      const regx = new RegExp(`^/${item.name}`, 'g');
      const isActive = regx.test(pathname);
      return (
        <Link key={index} to={`/${item.name}`} className={classNames({ active: isActive })} replace={`/${item.name}` === pathname} >
          {item.mdconf.title || item.name}
        </Link>
      );
    });
  }
  handleChange(checked) {
    checked
      ? document.body.classList.add(styles.darkMode)
      : document.body.classList.remove(styles.darkMode);
    this.setState({ checked });
  }
  render() {
    // const { location: { pathname }, menuSource, className, children, logo } = this.props;
    const { className, logo } = this.props;
    const { mdconf } = this.props.indexProps || {};
    return (
      <div className={classNames(styles.header, className)}>
        <div className={styles.wrapper}>
          <Link to="/" replace>
            <div className={styles.logo}>
              {logo && <img alt="logo" src={logo} />}
              {/* maybe it'll be named customly in the future */}
              <span>{mdconf.title || 'Create React Doc'}</span>
            </div>
          </Link>
        </div>
        <div className={styles.rightArea}>
          <Switch
            className={styles['no-dark-mode']}
            onChange={this.handleChange}
            checked={this.state.checked}
            width={50}
            height={24}
            offColor="#0f1114"
            onColor="#0f1114"
            uncheckedIcon={
              <img
                className={styles.sun}
                src="data:image/png;base64,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"
                width="16"
                height="16"
                role="presentation"
                alt="sun"
              />
            }
            checkedIcon={
              <img
                className={styles.moon}
                src="data:image/png;base64,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"
                width="16"
                height="16"
                role="presentation"
                alt="moon"
              />
            }
          />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  menuSource: PropTypes.array,
};

Header.defaultProps = {
  logo: null,
  menuSource: [],
};
