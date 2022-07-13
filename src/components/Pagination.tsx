import styled from 'styled-components';

import { PaginationProps } from '../interfaces';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 50px 0;
`;

const UnorderedList = styled.ul`
  display: flex;
  list-style: none;
  margin-bottom: 0;
`;

const ListButton = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid #5c5c5c;
  border-radius: 4px;
  margin: 0 2px;
  cursor: pointer;
`;

const ActionButton = styled.button`
  margin: 0 5px;
  cursor: pointer;
  padding: 0 8px;
  border: 1px solid #5c5c5c;
`;

const Pagination = ({
  dataPerPage,
  totalData,
  paginate,
  currentPage,
  setPage,
  changePage,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length < 2) return null;

  return (
    <Container>
      <ActionButton
        type="button"
        onClick={() => setPage(changePage - 1)}
        disabled={changePage === 1}
      >
        prev
      </ActionButton>

      <UnorderedList>
        {pageNumbers.map((number) => (
          <ListButton
            key={number}
            style={{
              color: currentPage === number ? 'white' : 'black',
              backgroundColor:
                currentPage === number ? 'rgb(46, 191, 162)' : 'white',
            }}
            type="button"
            onClick={() => paginate(number)}
          >
            {number}
          </ListButton>
        ))}
      </UnorderedList>

      <ActionButton
        disabled={changePage === pageNumbers.length}
        onClick={() => setPage(changePage + 1)}
      >
        next
      </ActionButton>
    </Container>
  );
};

export default Pagination;
