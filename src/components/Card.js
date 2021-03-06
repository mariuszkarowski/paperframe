import React, { Component } from "react";
import styled from "styled-components";

import { view } from "react-easy-state";

import { Link } from "react-router-dom";

import PostStore from "../stores/Post";
import AuthStore from "../stores/Auth";
import BookmarkStore from "../stores/Bookmark";

import getDateString from "../utils/getDateString";

import Icon from "./Icon";

import getDollars from "../utils/getDollars";
import typograph from "../utils/typograph";

const Wrapper = styled.div`
  padding: 12px 0;
  border-bottom: solid 1px #eee;
  display: flex;
  align-items: stretch;
  flex: 1 1 auto;
  .action-wrapper {
    button {
      opacity: 0.6;
    }
  }
  :hover {
    .action-wrapper {
      button {
        opacity: 1;
      }
    }
  }

  img {
    opacity: 0;
    transition: opacity 0.8s;
  }
  img.loaded {
    opacity: 1;
  }
`;
const RightCard = styled.div`
  margin-right: 10px;

  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LeftCard = styled.div`
  width: 160px;
  display: flex;
  flex: 0 0 auto;
  justify-content: center;

  @media only screen and (max-width: 480px) {
    width: 120px;
  }
  @media only screen and (max-width: 360px) {
    width: 90px;
  }
`;
const Title = styled.h3`
  margin: 12px 0;
  font-size: 18px;
  letter-spacing: 0.01em;

  width: ${({ hasImage }) => (!hasImage ? "calc(100% + 120px)" : "100%")};
  /* font-weight: normal; */
  letter-spacing: -0.02em;
`;
const SubTitle = styled.div`
  font-size: 14px;
  opacity: 0.7;
  line-height: 1.7;
`;
const Img = styled.img`
  width: 120px;
  height: 120px;
  border-radius:50%;
  object-fit: cover;
  background: #f6f6f6;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  /* padding: 10px 0; */
  font-size: 12px;
`;
const UserRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const Username = styled.div`
  font-weight: bold;
  opacity: 0.7;
`;
const Footer = styled.div`
  display: flex;
`;
const Votes = styled.div`
  display: flex;
  margin-right: 16px;
  svg {
    position: relative;
    top: -3px;
  }
`;
const Comment = styled.div`
  display: flex;
  margin-right: 16px;
  flex: 1;
`;
const Ava = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  background: #eee;
  border-radius: 20px;
  margin-right: 10px;
`;
const Earning = styled.div`
  display: flex;
  padding-top: 1px;
  font-size: 12px;
  opacity: 0.7;
  font-style: italic;
  padding-top: 1px;
`;
const Text = styled.div``;
const Head = styled.div`
  display: flex;
  font-size: 12px;
  opacity: 0.5;
`;
const Repost = styled.div`
  font-size: 12px;
  opacity: 0.5;
  margin-bottom: 10px;
  a {
    font-weight: bold;
  }
`;
const Category = styled.div`
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-bottom: solid 1px #aaa;
`;
const Time = styled.div`
  margin-left: 4px;
  font-style: italic;
`;
const ActionWrapper = styled.div`
  display: flex;
  &.hide {
    display: none;
  }
`;
const Action = styled.button`
  cursor: pointer;
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #fff;
  color: #999;
  font-size: 16px;
  margin: 0;
  &:hover {
    background: #eee;
  }
  &.love-active {
    color: #ff7452;
    opacity: 1 !important;
  }
  &.bookmark-active {
    color: #57d9a3;
    opacity: 1 !important;
  }
  &.loading {
    opacity: 0.4 !important;
  }
`;

class Card extends Component {
  votePost = data => {
    PostStore.votePost({
      author: data.author,
      permlink: data.permlink,
      weight: 10000
    });
  };
  unvotePost = data => {
    PostStore.votePost({
      author: data.author,
      permlink: data.permlink,
      weight: 0
    });
  };
  bookmarkPost = data => {
    BookmarkStore.bookmark({ author: data.author, permlink: data.permlink });
  };
  unBookmarkPost = data => {
    BookmarkStore.unBookmark({ author: data.author, permlink: data.permlink });
  };
  getCover(metadata) {
    if (metadata.image) {
      return metadata.image[0];
    }
    return "";
  }
  // getSubtitle(body) {
  //   console.log(removeMd(body));
  //   return "";
  // }
  render() {
    const { data, userFeed } = this.props;
    return (
      <Wrapper>
        <LeftCard>
            <Link to={`/@${data.author}/${data.permlink}`}>
              <Img
                src={
                  "https://steemitimages.com/160x200/" +
                  this.getCover(data.json_metadata)
                }
                onLoad={e => e.target.classList.add("loaded")}
              />
            </Link>



          
        </LeftCard>
        {this.getCover(data.json_metadata) ? (
          <RightCard>
{userFeed && userFeed !== data.author ? (
            <Repost>
              Reposted by <Link to={`/@${userFeed}`}>{userFeed}</Link>
            </Repost>
          ) : null}
          <Head>
            <Link to={`/tag/${data.category}`}>
              <Category>{data.category}</Category>
            </Link>
            <Time>{getDateString(data.created)}</Time>
          </Head>
          <Link to={`/@${data.author}/${data.permlink}`}>
            <Title hasImage={this.getCover(data.json_metadata)}>
              {typograph(data.title)}
            </Title>
          </Link>
          <User>
            <Link to={`/@${data.author}`}>
              <Ava
                src={`https://steemitimages.com/u/${data.author}/avatar/small`}
                onLoad={e => e.target.classList.add("loaded")}
              />
            </Link>
            <UserRight>
              <Link to={`/@${data.author}`}>
                <Username>{data.author}</Username>
              </Link>
              <Earning>${getDollars(data)}</Earning>
            </UserRight>
            <ActionWrapper
              className={`action-wrapper ${
                AuthStore.me.user ? "show" : "hide"
              }`}
            >
              {data.isVoted ? (
                <Action
                  className={`love-active ${data.voteLoading && "loading"}`}
                  disabled={data.voteLoading}
                  onClick={() => this.unvotePost(data)}
                >
                  <Icon type="love" />
                </Action>
              ) : (
                <Action
                  className={`${data.voteLoading && "loading"}`}
                  disabled={data.voteLoading}
                  onClick={() => this.votePost(data)}
                >
                  <Icon type="love-border" />
                </Action>
              )}
              {data.isBookmarked ? (
                <Action
                  className={`bookmark-active ${data.bookmarkLoading &&
                    "loading"}`}
                  disabled={data.bookmarkLoading}
                  onClick={() => this.unBookmarkPost(data)}
                >
                  <Icon type="bookmark" />
                </Action>
              ) : (
                <Action
                  className={`${data.bookmarkLoading && "loading"}`}
                  disabled={data.bookmarkLoading}
                  onClick={() => this.bookmarkPost(data)}
                >
                  <Icon type="bookmark-border" />
                </Action>
              )}
            </ActionWrapper>
          </User>
          </RightCard>
        ) : (
          <RightCard />
        )}
      </Wrapper>
    );
  }
}

export default view(Card);

