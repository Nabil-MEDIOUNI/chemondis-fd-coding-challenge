import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

import { SliderProps } from '../interfaces';

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

const Slider = (props: SliderProps) => {
  const photo = props.photos?.find(({ id }: any) => id === props.photoNumber);

  const nextIndex = props.indexPhoto - 1;
  const onSlideLeftClick = () => {
    if (nextIndex < 0) {
      return '';
    } else {
      props.setIndexPhoto(nextIndex);
      props.setPhotoNumber(props.photoNumber - 1);
    }
  };

  const onSlideRightClick = () => {
    if (props.photos.length - 1 === props.indexPhoto) {
      return '';
    } else {
      props.setIndexPhoto((props.indexPhoto + 1) % props.photos.length);
      props.setPhotoNumber(props.photoNumber + 1);
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
            Owner: <strong>{props.owner.name}</strong>
          </Typography>
          <Typography>
            Album: <strong>{props.album.title}</strong>
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
