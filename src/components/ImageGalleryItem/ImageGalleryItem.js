import PropTypes from "prop-types";
import { Item, ItemImage } from "./ImageGalleryItem.styled";
const ImageGalleryItem = ({ id, webformatURL, largeImageURL, onOpenModal }) => {
  return (
    <Item key={id} onClick={() => onOpenModal(largeImageURL)}>
      <ItemImage src={webformatURL} alt="" />
    </Item>
  );
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
