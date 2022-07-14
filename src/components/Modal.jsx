import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: flex;
  transform: ${props => (props.isOpen ? 'translateY(0)' : 'translateX(100%)')};
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

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      <StyledModal isOpen={isOpen}>
        {children}
        <StyledModalBackdrop isOpen={isOpen} onClick={onClose} />
      </StyledModal>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
};

export default Modal;
