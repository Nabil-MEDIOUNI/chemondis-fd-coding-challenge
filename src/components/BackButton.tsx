import { BackwardFilled } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { StyledBackButton } from '../utils/styles';

const BackButton = () => {
  const history = useHistory();

  return (
    <StyledBackButton onClick={history.goBack}>
      <BackwardFilled />
    </StyledBackButton>
  );
};

export default BackButton;
