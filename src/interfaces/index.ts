export interface AlbumsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  perPage: number;
  dataAlbums: any;
  dataPhotos: any;
  dataUsers: any;
  loadingAlbums: any;
  loadingPhotos: any;
  loadingUsers: any;
  errorAlbums: any;
  errorPhotos: any;
  errorUsers: any;
}

export interface PaginationProps {
  dataPerPage: any;
  totalData: any;
  paginate: any;
  currentPage: any;
  setPage: any;
  changePage: any;
}
