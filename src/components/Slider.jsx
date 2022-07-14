import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  height: inherit;
`;

const Typography = styled.p`
  font-size: 16px;
`;

const Button = styled.button`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 16px;
  padding: 8px;
  border-radius: 4px;
  background-color: #000;
  color: white;
  border: 0;
  font-weight: 500;
  text-decoration: none;
  outline: none;
  cursor: pointer;
`;

const Slider = ({
  indexPhoto,
  photos,
  photoNumber,
  setPhotoNumber,
  setIndexPhoto,
  owner,
  album,
}) => {
  const photo = photos?.find(({ id }) => id === photoNumber);

  const onSlideLeftClick = () => {
    const nextIndex = indexPhoto - 1;
    if (nextIndex === 0) {
      setIndexPhoto(photos.length);
      setPhotoNumber(photos.length);
    } else if (nextIndex < 0) {
      setIndexPhoto(photos.length - 1);
      setPhotoNumber(photos.length);
    } else {
      setIndexPhoto(nextIndex);
      setPhotoNumber(photoNumber - 1);
    }
  };

  const onSlideRightClick = () => {
    if (photos.length - 1 === indexPhoto) {
      setIndexPhoto(1);
      setPhotoNumber(1);
    } else {
      setIndexPhoto((indexPhoto + 1) % photos.length);
      setPhotoNumber(photoNumber + 1);
    }
  };

  return (
    <Container>
      <Button onClick={onSlideLeftClick}>
        <ArrowLeftOutlined />
      </Button>
      <div>
        <div>
          <Typography>
            Owner: <strong>{owner.name}</strong>
          </Typography>
          <Typography>
            Album: <strong>{album.title}</strong>
          </Typography>
          <Typography>
            Title: <strong>{photo?.title}</strong>
          </Typography>
        </div>
        <img src={photo?.url} alt="" />
      </div>
      <Button onClick={onSlideRightClick}>
        <ArrowRightOutlined />
      </Button>
    </Container>
  );
};

Slider.propTypes = {
  indexPhoto: PropTypes.number,
  photos: PropTypes.array,
  setIndexPhoto: PropTypes.func,
};

export default Slider;
