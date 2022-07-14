export interface AlbumsProps {
  currentPage: any;
  setCurrentPage: (page: number) => void;
  perPage: number;
  dataUsers: any;
  loadingUsers: any;
  errorUsers: any;
  dataAlbums: any;
  setDataAlbums: (dataAlbums: any) => void;
  loadingAlbums: boolean;
  errorAlbums: string;
}

export interface PhotosProps {
  perPage: number;
  dataUsers: any;
  loadingUsers: any;
  errorUsers: any;
  dataAlbums: any;
  seachByPhoto: string;
}

export interface PaginationProps {
  dataPerPage: any;
  totalData: any;
  paginate: any;
  currentPage: any;
  setPage: any;
  changePage: any;
}
