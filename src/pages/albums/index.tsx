import styled from 'styled-components';

import { SyncOutlined } from '@ant-design/icons';

import Pagination from '../../components/Pagination';

import { AlbumsProps } from '../../interfaces';
import getUserImage from '../../utils/getUserImage';

import {
  Section,
  Card,
  CardContent,
  CardMedia,
  CardTitle,
  ErrorMessage,
  UserAvatar,
  CardLink,
  Typography,
} from '../../utils/styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const AlbumsPage = ({
  currentPage,
  setCurrentPage,
  perPage,
  dataAlbums,
  dataPhotos,
  dataUsers,
  loadingAlbums,
  loadingPhotos,
  loadingUsers,
  errorAlbums,
  errorPhotos,
  errorUsers,
}: AlbumsProps) => {
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Get current albums
  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentDataAlbums = dataAlbums?.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  function getAlbums() {
    if (loadingAlbums || loadingPhotos || loadingUsers) {
      return (
        <Container className="loading">
          <SyncOutlined spin />
        </Container>
      );
    }

    if (errorAlbums || errorPhotos || errorUsers) {
      return <ErrorMessage>Error Occured!</ErrorMessage>;
    }

    if (currentDataAlbums.length === 0) {
      return <Typography>Empty List!</Typography>;
    }

    return currentDataAlbums.map((album: any) => {
      let urlPhoto: any = dataPhotos.find(
        (photo: any) => album.userId === photo.albumId,
      );
      let user: any = dataUsers.find((user: any) => album.userId === user.id);

      return (
        <CardLink to={`/photos/${album.id}`} key={album.id}>
          <Card key={album.id}>
            <CardContent>
              <Container>
                <UserAvatar src={getUserImage(user.name)} alt="" />
                <CardTitle>{user.name}</CardTitle>
              </Container>
              <CardTitle>{album.title}</CardTitle>
            </CardContent>
            <CardMedia src={urlPhoto.url.replace('600', '150')} alt="" />
          </Card>
        </CardLink>
      );
    });
  }

  return (
    <>
      <Section>{getAlbums()}</Section>
      <Pagination
        dataPerPage={perPage}
        setPage={setCurrentPage}
        changePage={currentPage}
        totalData={dataAlbums?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default AlbumsPage;
