import React from 'react';
import { graphql } from 'react-apollo';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Spin, Row, Col } from 'antd';
import Dropdown from 'react-dropdown'
import Primary from 'components/buttons/Primary';
import ModalV from './ModalV';
import MyWebsitesQuery from 'data/queries/MyWebsitesQuery';
import CreateWebsiteMutation from 'data/mutations/CreateWebsiteMutation';
import 'withStyles/dropdownStyle.css';

const enhance = compose(
  withState('modalWeb', 'setModalWeb', false),
  withHandlers({
    showModWeb: ({ setModalWeb }) => () => setModalWeb(_ => true),
    hideModWeb: ({ setModalWeb }) => () => setModalWeb(_ => false),
  }),
  graphql(MyWebsitesQuery, {
    options: () => ({
      skip: !localStorage.getItem('token'),
    })
  }),
  graphql(CreateWebsiteMutation, { name: 'createWebsite' }),
);
const WebsiteZone = enhance(({ styles, data, setValue, ...props }) => {
  console.log(data)
  if (data.loading)
    return <Spin size="large" /> 

  const createWebsite = (name) => () => {
     props.createWebsite({
      variables: {
        input: {
          name,
        }
      },
      refetchQueries:['myWebsites'],
    });
  }

  const options = data.myWebsites.map(w => ({
    value: w.id,
    label: w.name,
  }));

  return (
    <Row {...css(styles.container)}>
      <ModalV 
        title="New Website"
        placeholder="Website"
        visible={props.modalWeb}
        onOk={createWebsite}
        onCancel={props.hideModWeb}
      />
      <Col span={2} {...css(styles.text)}>
        Website: 
      </Col>
      <Col span={12}>
        <Dropdown 
          options={options} 
          value={"Select a website"} placeholder="Select an option"
          onChange={({ value }) => setValue(value)}
        />
      </Col>
      <Col span={7}>
        <Primary text="ADD NEW" onClick={props.showModWeb}/>
      </Col>
      <Col span={3}>
        fa
      </Col>
    </Row>
  )
});

export default withStyles(({ color, unit }) => ({
  container: {
    width: '100%',
    maxWidth: '1170px',
    display: 'inline-block'
  },
  text: {
    paddingTop: '18px',
    fontSIze: '18px',
  },
  select: {
    borderRadius: '20px',
  },
  option: {
    borderRadius: '20px',
  }
}))(WebsiteZone)