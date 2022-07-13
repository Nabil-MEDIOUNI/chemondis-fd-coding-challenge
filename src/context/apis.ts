import axios from 'axios';

const getUsers = () => axios.get('https://jsonplaceholder.typicode.com/users');

const getAlbums = () =>
  axios.get(`https://jsonplaceholder.typicode.com/albums`);

const getPhotos = () =>
  axios.get(`https://jsonplaceholder.typicode.com/photos`);

export { getUsers, getAlbums, getPhotos };
