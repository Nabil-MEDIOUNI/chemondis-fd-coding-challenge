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

export interface ModelProps {
  onClose: () => void;
  children: any;
  isOpen: boolean;
}

export interface SliderProps {
  indexPhoto: number;
  photos: any;
  photoNumber: number;
  setPhotoNumber: (photos: any) => void;
  setIndexPhoto: (photos: number) => void;
  owner: any;
  album: any;
}
