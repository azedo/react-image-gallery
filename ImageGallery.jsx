import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReactModal from 'react-modal'

export default class ImageGallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageId:      props.showImage,
      imageUrl:     null,
      imageCaption: null,
      imageTotal:   null,
      imageIndex:   null,
    }

    this.onKeyPressed = this.onKeyPressed.bind(this)
  }

  componentWillMount() {
    ReactModal.setAppElement(constantVars.appId)

    const initialImage = _.find(this.props.gallery, img => { return img.id == this.props.showImage })
    const initialIndex = _.findIndex(this.props.gallery, img => { return img.id == this.props.showImage })

    this.setState({
      imageId: initialImage.id,
      imageUrl: initialImage.src,
      imageCaption: initialImage.caption,
      imageTotal: this.props.gallery.length,
      imageIndex: initialIndex
    })

    window.addEventListener("keydown", this.onKeyPressed)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyPressed)
  }

  onKeyPressed(e){
    let { imageIndex } = this.state

    if (e.keyCode == 37) {
      this.onShowImage(imageIndex, 'previous')
    } else if (e.keyCode == 39) {
      this.onShowImage(imageIndex, 'next')
    }
  }

  onShowImage(n, action) {
    const { gallery } = this.props
    let index

    if (action == 'next') index = n + 1
    if (action == 'previous') index = n - 1

    if (index < 0 || index >= this.state.imageTotal) return false

    this.setState({
      imageId: gallery[index].id,
      imageUrl: gallery[index].src,
      imageCaption: gallery[index].caption,
      imageIndex: index,
    })
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        contentLabel="Gallery"
        onRequestClose={this.props.closeModalFn}
        className="image-gallery"
        overlayClassName="image-gallery__overlay"
      >
        <div className="image-gallery__content">
          <div className="image-gallery__header">
            <div className="image-gallery__count">{this.state.imageIndex + 1} of {this.state.imageTotal}</div>
            <button onClick={e => this.props.closeModalFn(e, null)} className="image-gallery__close">
              <span>
                <svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                  <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"></path>
                </svg>
              </span>
            </button>
          </div>

          <figure className="image-gallery__image">
            <img src={this.state.imageUrl} />

            <figcaption className="image-gallery__image-caption">{this.state.imageCaption}</figcaption>
          </figure>
        </div>

        {this.state.imageIndex >= 1 && <button type="button" className="arrow-left" title="Previous (Left arrow key)" onClick={() => this.onShowImage(this.state.imageIndex, 'previous')}>
          <span>
            <svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xmlSpace="preserve">
              <path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"></path>
            </svg>
          </span>
        </button>}

        {(this.state.imageIndex + 1) != this.state.imageTotal && <button type="button" className="arrow-right" title="Previous (Right arrow key)" onClick={() => this.onShowImage(this.state.imageIndex, 'next')}>
          <span>
            <svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xmlSpace="preserve">
              <path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"></path>
            </svg>
          </span>
        </button>}
      </ReactModal>
    )
  }
}

ImageGallery.defaultProps = {
  isOpen: false,
}

ImageGallery.propTypes = {
  isOpen:       PropTypes.bool,
  showImage:    PropTypes.string,
  gallery:      PropTypes.array.isRequired,
  closeModalFn: PropTypes.func.isRequired,
}
