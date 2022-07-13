import { AutoComplete, Button, Select } from 'antd';
import styled from 'styled-components';

import 'antd/dist/antd.min.css';

interface Props {
  allAlbumsTitle: { value: string }[];
  seachByAlbum: string;
  setSeachByAlbum: (e: string) => void;
  setPerPage: (perPage: number) => void;
  setCurrentPage: (page: number) => void;
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 2fr 2fr 150px;
  gap: 10px;
  margin: 10px;
`;

const { Option } = Select;

const SearchBar = (props: Props): JSX.Element => {
  return (
    <Container className="SearchBar">
      <AutoComplete
        value={props.seachByAlbum}
        placeholder="Search by album"
        options={props.allAlbumsTitle}
        onChange={(e) => {
          props.setCurrentPage(1);
          props.setSeachByAlbum(e);
        }}
        filterOption={(inputValue: string, option: any) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
      <Select placeholder="Per page" onChange={(e) => props.setPerPage(e)}>
        <Option value={10}>10</Option>
        <Option value={20}>20</Option>
        <Option value={30}>30</Option>
        <Option value={50}>50</Option>
      </Select>
      <Button
        onClick={() => {
          props.setSeachByAlbum('');
        }}
      >
        Clear search
      </Button>
    </Container>
  );
};

export default SearchBar;
