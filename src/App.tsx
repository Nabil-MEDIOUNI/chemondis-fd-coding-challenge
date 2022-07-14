import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

import SearchBar from './components/SearchBar';

import { getUsers } from './redux/actions/user';

const LazyAlbumsPage = React.lazy(() => import('./pages/albums'));
const LazyPhotosPage = React.lazy(() => import('./pages/photos'));

const App = () => {
  const { dataUsers, loadingUsers, errorUsers } = useSelector(
    (state: any) => state.userReducer,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [perPage, setPerPage] = useState(5);
  const [AlbumscurrentPage, setAlbumsCurrentPage] = useState(0);

  const [loadingAlbums, setAlbumsLoading] = useState(false);
  const [errorAlbums, setAlbumsError] = useState('');
  const [dataAlbums, setDataAlbums] = useState([]);

  const [seachByAlbum, setSeachByAlbum] = useState('');
  const [seachByPhoto, setseachByPhoto] = useState('');

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
          render={() => (
            <React.Suspense fallback="loading...">
              <LazyAlbumsPage
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
            </React.Suspense>
          )}
        />
        <Route
          path="/photos/:id"
          render={() => (
            <React.Suspense fallback="loading...">
              <LazyPhotosPage
                dataAlbums={dataAlbums}
                dataUsers={dataUsers}
                seachByPhoto={seachByPhoto}
                perPage={perPage}
                loadingUsers={loadingUsers}
                errorUsers={errorUsers}
              />
            </React.Suspense>
          )}
        />
        <Redirect to="/albums" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
