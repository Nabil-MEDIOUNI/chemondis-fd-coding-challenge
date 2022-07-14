import { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import AlbumPage from './pages/albums';
import PhotosPage from './pages/photos';

import SearchBar from './components/SearchBar';

import { getUsers } from './context/apis';
import useDataFetcher from './context/useFetcher';
import Axios from 'axios';

const App = () => {
  const [perPage, setPerPage] = useState(5);
  const [AlbumscurrentPage, setAlbumsCurrentPage] = useState(0);

  const [loadingAlbums, setAlbumsLoading] = useState(false);
  const [errorAlbums, setAlbumsError] = useState('');
  const [dataAlbums, setDataAlbums] = useState([]);

  const [seachByAlbum, setSeachByAlbum] = useState('');
  const [seachByPhoto, setseachByPhoto] = useState('');

  const [dataUsers, loadingUsers, errorUsers] = useDataFetcher(getUsers);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setAlbumsLoading(true);
        const result = await Axios.get(
          `https://jsonplaceholder.typicode.com/albums?_start=${AlbumscurrentPage}&_limit=${perPage}`,
        );
        setDataAlbums(result.data);
      } catch (e: any) {
        setAlbumsError(e);
      } finally {
        setAlbumsLoading(false);
      }
    };

    fetchAlbums();
  }, [AlbumscurrentPage, perPage]);

  const allAlbumsTitle = dataAlbums?.map((album: any, i: number) => {
    return { key: i, value: album.title };
  });

  const searchedAlbums = dataAlbums?.filter(
    (album: any) =>
      album?.title?.toLowerCase()?.indexOf(seachByAlbum.toLowerCase()) !== -1,
  );

  return (
    <BrowserRouter>
      <SearchBar
        allAlbumsTitle={allAlbumsTitle}
        seachByAlbum={seachByAlbum}
        seachByPhoto={seachByPhoto}
        setPerPage={setPerPage}
        setCurrentPage={setAlbumsCurrentPage}
        setSeachByAlbum={setSeachByAlbum}
        setseachByPhoto={setseachByPhoto}
      />
      <Switch>
        <Route
          path="/albums"
          render={() => {
            return (
              <AlbumPage
                dataAlbums={searchedAlbums}
                dataUsers={dataUsers}
                currentPage={AlbumscurrentPage}
                perPage={perPage}
                setCurrentPage={setAlbumsCurrentPage}
                setDataAlbums={setDataAlbums}
                loadingUsers={loadingUsers}
                errorUsers={errorUsers}
                loadingAlbums={loadingAlbums}
                errorAlbums={errorAlbums}
              />
            );
          }}
        />
        <Route
          path="/photos/:id"
          render={() => {
            return (
              <PhotosPage
                dataAlbums={dataAlbums}
                dataUsers={dataUsers}
                seachByPhoto={seachByPhoto}
                perPage={perPage}
                loadingUsers={loadingUsers}
                errorUsers={errorUsers}
              />
            );
          }}
        />
        <Redirect to="/albums" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
