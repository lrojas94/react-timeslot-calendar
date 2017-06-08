import React from 'react';
import PropTypes from 'prop-types';

export default class MarkdownSnippet extends React.Component {
  render() {
    const {
      snippet,
    } = this.props;

    return (
      <div dangerouslySetInnerHTML = { { __html: snippet } }/>
    );
  }
}

MarkdownSnippet.propTypes = {
  snippet: PropTypes.string,
};
