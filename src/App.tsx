import { HashRouter, Switch, Route } from 'react-router-dom';

import AlbumPage from './pages/albums';

import SearchBar from './components/SearchBar';

import { getUsers, getAlbums, getPhotos } from './context/apis';
import useDataFetcher from './context/useFetcher';
import { useState } from 'react';

const App = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [seachByAlbum, setSeachByAlbum] = useState('');

  const [dataUsers, loadingUsers, errorUsers]: any = useDataFetcher(getUsers);
  const [dataAlbums, loadingAlbums, errorAlbums]: any =
    useDataFetcher(getAlbums);
  const [dataPhotos, loadingPhotos, errorPhotos] = useDataFetcher(getPhotos);

  const allAlbumsTitle = dataAlbums?.map((job: any, i: number) => {
    return { key: i, value: job.title };
  });

  const searchedAlbums = dataAlbums?.filter(
    (album: any) =>
      album?.title.toLowerCase()?.indexOf(seachByAlbum.toLowerCase()) !== -1,
  );

  return (
    <HashRouter>
      <SearchBar
        setPerPage={setPerPage}
        setCurrentPage={setCurrentPage}
        seachByAlbum={seachByAlbum}
        setSeachByAlbum={setSeachByAlbum}
        allAlbumsTitle={allAlbumsTitle}
      />
      <Switch>
        <Route
          path="/"
          render={() => {
            return (
              <AlbumPage
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPage={perPage}
                dataAlbums={searchedAlbums}
                dataPhotos={dataPhotos}
                dataUsers={dataUsers}
                loadingAlbums={loadingAlbums}
                loadingPhotos={loadingPhotos}
                loadingUsers={loadingUsers}
                errorAlbums={errorAlbums}
                errorPhotos={errorPhotos}
                errorUsers={errorUsers}
              />
            );
          }}
        />
      </Switch>
    </HashRouter>
  );
};

export default App;
