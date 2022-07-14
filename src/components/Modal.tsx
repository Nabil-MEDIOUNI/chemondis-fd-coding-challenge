import styled from 'styled-components';

import { ModelProps } from '../interfaces';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
`;

const Modal = (props: ModelProps) => {
  return (
    <StyledModal>
      {props.children}
      <StyledModalBackdrop onClick={props.onClose} />
    </StyledModal>
  );
};

export default Modal;
