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
    this.bindedBottom = false;
    this.bindedTop = false;
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
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollBottom = scrollTop + windowHeight;
    const scrollDiff = scrollTop - this.lastScroll;
    const scrollingDown = scrollDiff > 0;
    const parent = this.container.parentNode;

    const viewportOffset = this.container.getBoundingClientRect();

    const fits = (windowHeight >= sidebarHeight);
    const overlaps = (viewportOffset.top < parent.getBoundingClientRect().top);
    const shouldBindTop = (viewportOffset.top >= 72 && !scrollingDown && !overlaps && scrollTop >= parent.offsetTop);

    if (fits) {
      if (viewportOffset.top <= stickPosition) {
        this.container.style.position = 'fixed';
        this.container.style.top = stickPosition;
      }

      if (overlaps) {
        this.container.style.position = 'absolute';
        this.container.style.top = 'auto';
      }
    } else {
      // Bind to bottom
      if (!this.bindedBottom && scrollingDown && viewportOffset.bottom <= windowHeight) {
        console.log('1');
        this.container.style.position = 'fixed';
        this.container.style.top = `${windowHeight - sidebarHeight}px`;
        this.bindedBottom = true;
      // Unbind from bottom
      } else if (this.bindedBottom && !scrollingDown) {
        console.log('2');
        this.container.style.position = 'absolute';
        this.container.style.top = `${scrollBottom - (sidebarHeight + 292)}px`;
        this.bindedBottom = false;
      } else if (shouldBindTop) {
        this.container.style.position = 'fixed';
        this.container.style.top = `${stickPosition}px`;
      } else if (overlaps) {
        this.container.style.position = 'absolute';
        this.container.style.top = 'auto';
      }
    }

    // TODO: Unbind from top

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
