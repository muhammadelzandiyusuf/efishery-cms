import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import './pagination.scss';

const Pagination = ({ total, limit, current }) => {
  const totalPage = Math.ceil(total / limit);
  const navigate = useNavigate();

  const handleNextPage = () => {
    if (current < totalPage) {
      const newPage = current + 1;
      navigate(`?page=${newPage}`);
    }
  };

  const handlePreviousPage = () => {
    if (current > 1) {
      const newPage = current - 1;
      navigate(`?page=${newPage}`);
    }
  };

  return (
    <div className='pagination-container'>
      <div className='simple-pagintaion'>
        <h5
          onClick={handlePreviousPage}
          className={current === 1 ? 'color-grey' : 'cursor-pointer'}
        >
          <AiOutlineLeft /> Previous Page
        </h5>
        <h5
          onClick={handleNextPage}
          className={current === totalPage ? 'color-grey' : 'cursor-pointer'}
        >
          Next Page <AiOutlineRight />
        </h5>
      </div>
      <h6 className='color-grey'>{`${current} of ${totalPage}`}</h6>
    </div>
  );
};

export default Pagination;
