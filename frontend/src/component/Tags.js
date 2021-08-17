import { Component } from "react";
import styled from 'styled-components';

const ENTER_KEY = 13;
const COMMA_KEY = 188;
const BACKSPACE_KEY = 8;

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: ["데이트코스", "맛집", "먹방"], value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleKeyUp(e) {
    const key = e.keyCode;

    if (key === ENTER_KEY || key === COMMA_KEY) {
      this.addTag();
    }
  }

  handleKeyDown(e) {
    const key = e.keyCode;
    if (key === BACKSPACE_KEY && !this.state.value) {
      this.editPrevTag();
    }
  }

  addTag() {
    const { tags, value } = this.state;
    let tag = value.trim();

    tag = tag.replace(/,/g, "");

    if (!tag) {
      return;
    }

    this.setState({
      tags: [...tags, tag],
      value: ""
    });
  }

  editPrevTag() {
    let { tags } = this.state;

    const tag = tags.pop();

    this.setState({ tags, value: tag });
  }

  render() {
    const { tags, value } = this.state;
    return (
      <TagForm>
        <Tag>
          <ul>
            {tags.map((tag, i) => (
              <li key={tag + i}>
                {tag}
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add tag..."
            value={value}
            onChange={this.handleChange}
            ref="tag"
            onKeyUp={this.handleKeyUp}
            onKeyDown={this.handleKeyDown}
          />
        </Tag>
        <Small>
          태그하고 싶은 단어를 쓰고 <code>엔터</code> 나 <code>,</code> 를 입력하세요{" "}
          <code>←</code> 로 지울 수 있어요.
        </Small>
      </TagForm>
    );
  }
}

export default Tags;

const TagForm = styled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    min-width: 700px;
    font-family: 'open sans', 'helvetica neue', helvetica, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #222;
    background: #ecf0f1;
`;

const Tag = styled.div`
    background: #fff;
    padding: 5px;
    overflow: hidden;
    input {
        padding: 5px 10px;
        box-sizing: border-box;
        color: #7f8c8d;
        border: 0;
        float: left;
        margin: 10px 0;
        font-size: 16px;
        outline: 0;
    }
    ul {
      list-style:none;
      li {
          color: #fff;
          font-weight: bold;
          background: #3498db;
          float: left;
          padding: 5px 10px;
          border-radius: 10em;
          margin: 5px;
          button {
              background: transparent;
              border: 0;
              cursor: pointer;
          }
      }
    }
`;

const Small = styled.small`
    color: #7f8c8d; 
    font-size: 14px;
    margin-top: 10px;
    display: block;
    line-height: 16px;
    code {
        font-size: 12px;
        background: #FCF8D0;
        display: inline-block;
        font-family: courier;
        padding: 4px 6px;
        border-radius: 4px;
    }
`;