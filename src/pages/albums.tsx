import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

import { SyncOutlined } from '@ant-design/icons';

import { AlbumsProps } from '../interfaces';
import getUserImage from '../utils/getUserImage';

import {
  Section,
  Card,
  CardContent,
  CardMedia,
  CardTitle,
  ErrorMessage,
  UserAvatar,
  Typography,
} from '../utils/styles';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const AlbumsPage = <TItem,>({
  dataAlbums,
  dataUsers,
  currentPage,
  perPage,
  setCurrentPage,
  setDataAlbums,
  loadingUsers,
  errorUsers,
  loadingAlbums,
  errorAlbums,
}: AlbumsProps<TItem>) => {
  const history = useHistory();
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + perPage;
    setDataAlbums(dataAlbums.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(100 / perPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, perPage]);

  const handlePageChange = (selectedObject: any) => {
    setCurrentPage(selectedObject.selected);
    const newOffset = (selectedObject.selected * perPage) % dataAlbums.length;
    setItemOffset(newOffset);
  };

  function getAlbums() {
    if (loadingUsers || loadingAlbums) {
      return (
        <Container className="loading">
          <SyncOutlined spin />
        </Container>
      );
    }

    if (errorUsers || errorAlbums) {
      return <ErrorMessage>Error Occured!</ErrorMessage>;
    }

    if (dataAlbums.length === 0) {
      return <Typography>Empty List!</Typography>;
    }

    return dataAlbums.map((album: any) => {
      let user: any = dataUsers.find((user: any) => album.userId === user.id);
      let urlPhoto: string = `https://via.placeholder.com/150/${user.id * 20}`;
      return (
        <Card
          onClick={() => history.push(`/photos/${album.id}`)}
          key={album.id}
        >
          <CardContent>
            <Container>
              <UserAvatar src={getUserImage(user.name)} alt="" />
              <CardTitle>{user.name}</CardTitle>
            </Container>
            <CardTitle>{album.title}</CardTitle>
          </CardContent>
          <CardMedia src={urlPhoto} alt="" />
        </Card>
      );
    });
  }

  function getPagination() {
    if (!errorUsers && !loadingUsers && !errorAlbums && !loadingAlbums) {
      return (
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageChange}
          selectedPageRel={currentPage}
          forcePage={currentPage}
        />
      );
    }

    return null;
  }

  return (
    <>
      <Section>{getAlbums()}</Section>
      {getPagination()}
    </>
  );
};

export default AlbumsPage;
