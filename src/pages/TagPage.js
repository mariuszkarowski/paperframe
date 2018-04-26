import React, { Component } from "react";
import styled from "styled-components";

import { view } from "react-easy-state";

import AuthStore from "../stores/Auth";

import Sidebar from "../sections/HomePage/Sidebar";
import Feed from "../sections/HomePage/Feed";

const WrapContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 0 auto;
`;
const Content = styled.div``;
class TagPage extends Component {
  render() {
    const { tag } = this.props.match.params;
    return (
      <div>
        <WrapContent>
          <Content>
            <Feed isLogin={AuthStore.isLogin} tag={tag} />
          </Content>
          <Sidebar />
        </WrapContent>
      </div>
    );
  }
}

export default view(TagPage);