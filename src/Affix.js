import React from 'react';
import PropTypes from 'prop-types';

class Affix extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.startPosition = 0;
    this.lastScroll = document.body.scrollTop;

    this.top = document.body.scrollTop;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const windowHeight = document.body.clientHeight;
    const scrollTop = document.body.scrollTop;
    const scrollDiff = scrollTop - this.lastScroll;
    const scrollingDown = this.lastScroll < document.body.scrollTop;

    const viewportOffset = this.container.getBoundingClientRect();

    if (scrollingDown && (viewportOffset.bottom <= windowHeight)) {
      this.top += scrollDiff;
    }

    if (!scrollingDown && viewportOffset.top >= this.startPosition) {
      this.top += scrollDiff;
    }

    this.container.style.top = `${this.top}px`;

    if (this.startPosition === 0) {
      this.startPosition = this.container.getBoundingClientRect().top;
    }

    this.lastScroll = scrollTop;
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={{ position: 'absolute' }}
        ref={(container) => { this.container = container; }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Affix;
