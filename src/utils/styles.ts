import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 250px;
  margin: 16px;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
`;

export const CardMedia = styled.img`
  display: inline-block;
  width: 100%;
  height: 70%;
  object-fit: cover;
  background-color: #a31545;
`;

export const UserAvatar = styled.img`
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px;
  height: 30%;
  overflow: hidden;
`;

export const CardTitle = styled.span`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: center;
`;

export const Container = styled.div``;

export const Typography = styled.p`
  font-size: 16px;
`;

export const ErrorMessage = styled.h2`
  text-align: center;
`;

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const CardLink = styled(Link)`
  text-decoration: none;
`;
