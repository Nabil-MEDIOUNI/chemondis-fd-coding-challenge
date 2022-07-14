import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import Axios from 'axios';

import { SyncOutlined } from '@ant-design/icons';

import BackButton from '../components/BackButton';
import Slider from '../components/Slider';
import Modal from '../components/Modal';

import { PhotosProps } from '../interfaces';

import {
  Card,
  CardContent,
  CardMedia,
  CardTitle,
  ErrorMessage,
} from '../utils/styles';

const Container = styled.div`
  margin: 24px;
`;

const Typography = styled.p`
  font-size: 16px;
`;

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const PhotosPage = <TItem,>({
  dataAlbums,
  perPage,
  dataUsers,
  loadingUsers,
  errorUsers,
  seachByPhoto,
}: PhotosProps<TItem>) => {
  const { id }: any = useParams();

  const [loadingPhotos, setPhotosLoading] = useState(false);
  const [errorPhotos, setPhotosError] = useState('');
  const [dataPhotos, setDataPhotos] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + perPage;
    setDataPhotos(dataPhotos.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(100 / perPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, perPage]);

  const fetchPhotos = async () => {
    try {
      setPhotosLoading(true);
      const result = await Axios.get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}&_start=${currentPage}&_limit=${perPage}`,
      );
      setDataPhotos(result.data);
    } catch (e: any) {
      setPhotosError(e);
    } finally {
      setPhotosLoading(false);
    }
  };

  const handlePageChange = (selectedObject: any) => {
    setCurrentPage(selectedObject.selected);
    const newOffset = (selectedObject.selected * perPage) % dataPhotos.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perPage, id]);

  const [getPhotoNumber, setPhotoNumber] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [indexPhoto, setIndexPhoto] = useState(0);

  const album: any = dataAlbums?.find(
    (object: any) => object.id === Number(id),
  );
  const owner: any = dataUsers?.find(({ id }: any) => album?.userId === id);

  const searchedPhotos = dataPhotos?.filter(
    (photo: any) =>
      photo?.title?.toLowerCase()?.indexOf(seachByPhoto.toLowerCase()) !== -1,
  );

  function getPhotosWrapper() {
    if (loadingPhotos || loadingUsers) {
      return (
        <Container className="loading">
          <SyncOutlined spin />
        </Container>
      );
    }

    if (errorPhotos || errorUsers) {
      return <ErrorMessage>Error Occured!</ErrorMessage>;
    }

    return (
      <>
        <BackButton />

        <Container>
          <Typography>
            Owner: <strong>{owner?.name}</strong>
          </Typography>
          <Typography>
            Album: <strong>{album?.title}</strong>
          </Typography>
        </Container>

        {modalOpen && (
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <Slider
              indexPhoto={indexPhoto}
              photos={searchedPhotos}
              owner={owner}
              album={album}
              photoNumber={getPhotoNumber}
              setIndexPhoto={setIndexPhoto}
              setPhotoNumber={setPhotoNumber}
            />
          </Modal>
        )}

        <Wrapper>
          {searchedPhotos.map((item: any, i: number) => (
            <Card
              key={item.id}
              onClick={() => {
                setIndexPhoto(i);
                setPhotoNumber(item.id);
                setModalOpen(true);
              }}
            >
              <CardMedia src={item.thumbnailUrl} alt={item.title} />
              <CardContent>
                <CardTitle>{item.title}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </Wrapper>
      </>
    );
  }

  function getPagination() {
    if (!errorUsers && !errorPhotos && !loadingUsers && !loadingPhotos) {
      return (
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageChange}
          forcePage={currentPage}
        />
      );
    }

    return null;
  }

  return (
    <>
      {getPhotosWrapper()}
      {getPagination()}
    </>
  );
};

export default PhotosPage;
