import React from "react";
import Html from "slate-html-serializer";

const BLOCK_TAGS = {
  p: "paragraph",
  pre: "code-block",
  h1: "heading-one",
  h2: "heading-two",
  h3: "heading-three",
  h4: "heading-four",
  h5: "heading-five",
  h6: "heading-six",
  blockquote: "block-quote",
  ol: "numbered-list",
  ul: "bulleted-list",
  li: "list-item",
  figure: "figure",
  img: "image",
  figcaption: "figcaption",
  hr: "divider",
  table: "table",
  tr: "table-row",
  td: "table-cell",
  div: "div",
  center: "center"
};
// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: "italic",
  i: "italic",
  strong: "bold",
  b: "bold",
  u: "underline",
  code: "code",
  abbr: "small-caps",
  sup: "sup",
  sub: "sub"
};

const INLINE_TAGS = {
  a: "link",
  img: "image"
};

const deserializeNode = (el, next) => {
  let type = BLOCK_TAGS[el.tagName.toLowerCase()];
  if (type) {
    let data = {};
    if (type === "image") {
      data = {
        src: el.src
      };
    }
    if (type === "div") {
      if (el.classList.contains("pull-right")) {
        type = "pull-right";
      } else if (el.classList.contains("pull-left")) {
        type = "pull-left";
      } else if (el.classList.contains("code-line")) {
        type = "code-line";
      } else {
        type = "div";
      }
      data = {
        // pull
      };
    }
    return {
      object: "block",
      type: type,
      nodes: next(el.childNodes),
      data
    };
  }
};

const serializeNode = (obj, children) => {
  if (obj.object == "block") {
    switch (obj.type) {
      case "paragraph":
        return <p>{children}</p>;
      case "code-block":
        return (
          <pre>
            <code>{children}</code>
          </pre>
        );
      case "heading-one":
        return <h1>{children}</h1>;
      case "heading-two":
        return <h2>{children}</h2>;
      case "heading-three":
        return <h3>{children}</h3>;
      case "heading-four":
        return <h4>{children}</h4>;
      case "heading-five":
        return <h5>{children}</h5>;
      case "heading-six":
        return <h6>{children}</h6>;
      case "block-quote":
        return <blockquote>{children}</blockquote>;
      case "numbered-list":
        return <ol>{children}</ol>;
      case "bulleted-list":
        return <ul>{children}</ul>;
      case "list-item":
        return <li>{children}</li>;
      case "center":
        return <center>{children}</center>;
      case "image":
        return <img src={obj.data.get("src")} />;
      case "figure":
        return <figure>{children}</figure>;
      case "figcaption":
        return <figcaption>{children}</figcaption>;
      case "divider":
        return <hr />;
      case "table":
        return (
          <table>
            <tbody>{children}</tbody>
          </table>
        );
      case "table-row":
        return <tr>{children}</tr>;
      case "table-cell":
        return <td>{children}</td>;
      case "pull-left":
        return <div className="pull-left">{children}</div>;
      case "pull-right":
        return <div className="pull-right">{children}</div>;
      case "code-line":
        return <div className="code-line">{children}</div>;
      case "div":
        return <div>{children}</div>;
    }
  }
};

const deserializeMark = (el, next) => {
  const type = MARK_TAGS[el.tagName.toLowerCase()];
  if (type) {
    return {
      object: "mark",
      type: type,
      nodes: next(el.childNodes)
    };
  }
};

const serializeMark = (obj, children) => {
  if (obj.object == "mark") {
    switch (obj.type) {
      case "bold":
        return <strong>{children}</strong>;
      case "italic":
        return <em>{children}</em>;
      case "underline":
        return <u>{children}</u>;
      case "code":
        return <code>{children}</code>;
      case "strikethrough":
        return <del>{children}</del>;
      case "small-caps":
        return <abbr>{children}</abbr>;
      case "sup":
        return <sup>{children}</sup>;
      case "sub":
        return <sub>{children}</sub>;
    }
  }
};

const deserializeInline = (el, next) => {
  const type = INLINE_TAGS[el.tagName.toLowerCase()];
  if (type) {
    let data = {};
    if (type === "link") {
      data = { href: el.href };
    }
    return {
      object: "inline",
      type: type,
      nodes: next(el.childNodes),
      data
    };
  }
};
const serializeInline = (obj, children) => {
  if (obj.object == "inline") {
    switch (obj.type) {
      case "link":
        return <a href={obj.data.get("href")}>{children}</a>;
      case "image":
        return <img src={obj.data.get("src")} />;
    }
  }
};

const rules = [
  // Rule that handles nodes...
  {
    deserialize: deserializeNode,
    serialize: serializeNode
  },
  // Rule that handles marks...
  {
    deserialize: deserializeMark,
    serialize: serializeMark
  },
  // Rule that handles inlines...
  {
    deserialize: deserializeInline,
    serialize: serializeInline
  }
];

const serializer = new Html({ rules });
export default serializer;
