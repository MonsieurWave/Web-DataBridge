import React from 'react';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { css, withStyles } from 'withStyles';
import { Row, Col, Spin } from 'antd';
import { compose, withState, withHandlers } from 'recompose';
import MeQuery from 'data/queries/MeQuery';
import SimpleModal from './popups/SimpleModal';

function LoginSignup({ styles }) {
  return (
    <ul {...css(styles.mainMenuUl)}>
      <li
        {...css(styles.loginSignup)}
      >
        <Link to="/login" {...css(styles.login)}> LOGIN </Link>
      </li>
      <li
        {...css(styles.loginSignup)}
      >
        <Link to="/signup" {...css(styles.signup)}>
          SIGN UP
        </Link>
      </li>
    </ul>
  )
};

const enhance = compose(
  graphql(MeQuery, {
    options: () => ({
      skip: !localStorage.getItem('token'),
    })
  }),
  withApollo,
);
const CustomerMenu = enhance(({ styles, data, client }) => {
  let Comp;
  const handleLogout = () => {
    client.resetStore();
    localStorage.clear();
  }
  if (data && data.me)
    Comp = (
    <ul {...css(styles.mainMenuUl)}>
      <li {...css(styles.mainMenuLi)}> Hi {data.me.email} !</li>
{/*       <li {...css(styles.mainMenuLi)}> Your Account </li> */}
      <li {...css(styles.mainMenuLi)}>
        <Link to="/panel" {...css(styles.link)}>
          Admin Panel
        </Link>
      </li>
      <li {...css(styles.loginSignup)}>
        <Link to="/" onClick={handleLogout} {...css(styles.signup)}>
          LOG OUT
        </Link>
      </li>
    </ul>

    );
  else
    Comp = (
      <Spin/>
    );

  return (
    <div>
      {Comp}
    </div>
  )
})

const enhanceContact = compose(
  withState('contactVisible', 'setContact', false),
);
const ContactButton = enhanceContact(({ styles, ...props }) => {
  return (
    <div>
      <button
        {...css(styles.contactButton)}
        onClick={_ => props.setContact(true)}
      >
        CONTACT
      </button>
      {props.contactVisible ?
        <SimpleModal
          styles={styles}
          toggleVisible={props.setContact}
          text={(
            <span>
              Contact us. <br/>
            <hr/>
              <a href="mailto:contact.us@vlynt.com?Subject=Hello%20again">contact.us@vlynt.com</a>
            </span>
          )}/> :
        null
      }
  </div>
  )
});

const FullMenu = ({ styles }) => {
  return (
    <ul {...css(styles.mainMenuUl)}>
      <li {...css(styles.mainMenuLi)}> Solutions </li>
      <li {...css(styles.mainMenuLi)}> Features </li>
      <li {...css(styles.mainMenuLi)}> Pricing </li>
      <li {...css(styles.mainMenuLi)}> FAQ </li>
      <li {...css(styles.mainMenuLi)}> Case studies </li>
      <li {...css(styles.mainMenuLi)}> Blog </li>
      <li {...css(styles.mainMenuLi)}> Contact </li>
    </ul>
  )
};

const enhanceHeader = compose(
  withState(),
);
const Header = enhanceHeader(({ styles, ...props }) => {
  const MenuSpe = localStorage.getItem('token') ? CustomerMenu : LoginSignup;
  const Menu = localStorage.getItem('token') ?
    (
      <span>
        <Col span={20} {...css(styles.colMainMenuSpe)}>
          <MenuSpe styles={styles} />
        </Col>
      </span>
    ) : (
      <span>
        <Col span={13}/>
        <Col span={1} {...css(styles.mainMenuItem)}>
          <Link to="/faq" {...css(styles.link)}>
            FAQ
          </Link>
        </Col>
        <Col span={2} {...css(styles.mainMenuItem)}>
          <ContactButton styles={styles}/>
        </Col>
        <Col span={4} {...css(styles.colMainMenu)}>
          <MenuSpe styles={styles} />
        </Col>
      </span>
    )

  return (
    <Row {...css(styles.container)}>
      <Col span={4} {...css(styles.colLogo)}>
      <Link to="/">
        <img src="../../imgs/logos/logo_white.png" alt="log_rgb" {...css(styles.logo)}/>
      </Link>
      </Col>
      {Menu}
    </Row>
  )
})


export default  withStyles(({ color, unit }) => ({
  container: {
    backgroundImage: color.gradientLeft,
    color: 'white',
    height: '80px',
  },
  modal: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    textAlign: 'center',
  },
  modalContent: {
    position: 'absolute',
    width: '300px',
    height: '100px',
    left: '50%',
    top: '25%',
    marginLeft: '-150px',
    backgroundColor: 'black',
    borderRadius: '15px',
    backgroundColor: 'white',
    color: color.darkPrimary,
    fontSize: '18px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '12px'
  },
  colMainMenu: {
    textAlign: 'center',
    paddingTop: '25px',
  },
  mainMenuItem: {
    color: 'white',
    fontSize: '18px',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colMainMenuSpe: {
    textAlign: 'right',
    paddingTop: '25px',
  },
  colLogo: {
    paddingTop: '10px',
    textAlign: 'center',
    height: '100%'
  },
  mainMenuUl: {
    width: '100%',
  },
  mainMenuLi: {
    color: 'white',
    marginLeft: '1%',
    marginRight: '1%',
    display: 'inline',
    fontSize: '18px',
    width: '200px',
    textAlign: 'center',
  },
  loginSignup: {
    color: 'white',
    display: 'inline',
    marginLeft: '1%',
    marginRight: '1%',
  },
  login: {
    color: 'white',
  },
  signup: {
    color: 'white',
    textAlign: 'center',
    padding: '5px',
    borderRadius: '17px',
    width: '120px',
    height: '34px',
    border: '1px solid white',
    display: 'inline-block'
  },
  logo: {
    width: '3.81cm',
    height: '1.41cm'
  },
  contactContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactButton: {
    color: 'white',
    fontSize: '18px',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    border: '0px',
    outline: '0',
    ':hover': {
      cursor: 'pointer',
    },
  },
  link: {
    color: 'white',
    ':hover': {
      color: color.lightPrimary,
    },
  },

  }))(Header)
