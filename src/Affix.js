import React from 'react';
import PropTypes from 'prop-types';

class Affix extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    stickPosition: PropTypes.number,
  }

  static defaultProps = {
    className: '',
    stickPosition: 0,
  }

  constructor(props) {
    super(props);
    this.initialized = false;
    this.lastScroll = document.body.scrollTop;

    this.top = 0;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const { stickPosition } = this.props;

    const windowHeight = document.body.clientHeight;
    const sidebarHeight = this.container.clientHeight;
    const scrollTop = document.body.scrollTop;
    const scrollDiff = scrollTop - this.lastScroll;
    const scrollingDown = this.lastScroll < document.body.scrollTop;
    const parent = this.container.parentNode;

    const viewportOffset = this.container.getBoundingClientRect();

    const fits = (windowHeight >= sidebarHeight);

    if (fits) {
      if (scrollingDown && viewportOffset.top <= stickPosition) {
        this.container.style.position = 'fixed';
        this.container.style.top = stickPosition;
      }

      const overlaps = (viewportOffset.top < parent.getBoundingClientRect().top);

      if (!scrollingDown && overlaps) {
        this.container.style.position = 'absolute';
        this.container.style.top = 'auto';
      }
    }

    // if (fits) {
    //   if (scrollTop >= offsetParent.offsetTop - stickPosition) {
    //     console.log(offsetParent.offsetTop);
    //     this.top = document.body.scrollTop + (stickPosition - offsetParent.offsetTop);
    //   } else {
    //     this.top = 0;
    //   }
    // } else {
    //   if (scrollingDown && (viewportOffset.bottom <= windowHeight)) {
    //     this.top += scrollDiff;
    //   }

    //   if (!scrollingDown && viewportOffset.top >= stickPosition) {
    //     this.top += scrollDiff;
    //   }
    // }

    // if (this.top < 0) {
    //   this.top = 0;
    // }

    // this.container.style.top = `${this.top}px`;

    // if (!this.initialized && !fits) {
    //   if (this.container.getBoundingClientRect().top >= stickPosition
    //     && offsetParent.getBoundingClientRect().top <= stickPosition) {
    //     this.top -= offsetParent.offsetTop - stickPosition;
    //     this.container.style.top = `${this.top}px`;
    //   }
    //   this.initialized = true;
    // }

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
