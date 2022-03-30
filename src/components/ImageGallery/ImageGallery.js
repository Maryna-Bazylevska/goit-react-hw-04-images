import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import ImageGalleryItem from "../ImageGalleryItem";
import Loader from "../Loader";
import * as fetch from "../service/fetchImages";
import { GaleryList } from "./ImageGallery.styled";
import Modal from "../Modal";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};
function ImageGallery({ imageName }) {
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setErrors] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  useEffect(() => {
    if (!imageName) {
      return;
    }
    setStatus(Status.PENDING);
    setPageNumber(1);
    fetch
      .fetchImages(imageName, 1)
      .then((data) => {
        if (data.hits.length < 1) {
          setStatus(Status.IDLE);
          return alert("Something wrong!");
        } else {
          setItems(data.hits);
          setStatus(Status.RESOLVED);
          setPageNumber((prevState) => prevState + 1);
        }
      })
      .catch((error) => {
        setStatus(Status.REJECTED);
        setErrors(true);
      })
      .finally(handleScroll());
  }, [imageName]);
  const handleScroll = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 500);
  };

  const onLoadMore = (e) => {
    fetch
      .fetchImages(imageName, pageNumber)
      .then((data) => {
        setPageNumber((prevState) => prevState + 1);
        setItems((prevState) => [...prevState, ...data.hits]);
        setStatus(Status.RESOLVED);
      })
      .finally(handleScroll());
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const onLargeImgClick = (imageUrl) => {
    setLargeImageURL(imageUrl);
    toggleModal();
  };
  if (status === Status.IDLE) {
    return <></>;
  }
  if (status === Status.PENDING) {
    return <Loader />;
  }
  if (status === Status.RESOLVED)
    return (
      <div>
        {showModal && (
          <Modal onClose={toggleModal} imageUrl={largeImageURL}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}

        <GaleryList>
          {items.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              onOpenModal={onLargeImgClick}
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          ))}
        </GaleryList>
        {items.length > 0 && <Button onLoadMore={onLoadMore} />}
      </div>
    );
}
ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};
export default ImageGallery;
