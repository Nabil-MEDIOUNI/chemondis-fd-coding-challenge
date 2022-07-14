export interface AlbumsProps<TItem> {
  currentPage: any;
  setCurrentPage: (page: number) => void;
  perPage: number;
  dataUsers: TItem[];
  loadingUsers: boolean;
  errorUsers: string;
  dataAlbums: TItem[];
  setDataAlbums: (dataAlbums: any) => void;
  loadingAlbums: boolean;
  errorAlbums: string;
}

export interface PhotosProps<TItem> {
  perPage: number;
  dataUsers: TItem[];
  loadingUsers: boolean;
  errorUsers: string;
  dataAlbums: TItem[];
  seachByPhoto: string;
}

export interface ModelProps {
  onClose: () => void;
  children: React.ReactNode;
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

export interface SearchBarProps {
  allAlbumsTitle: { value: string }[];
  seachByAlbum: string;
  seachByPhoto: string;
  setSeachByAlbum: (e: string) => void;
  setseachByPhoto: (e: string) => void;
  setPerPage: (perPage: number) => void;
  setCurrentPage: (page: number) => void;
}
