import './loading.scss';

const Loading = () => {
  return (
    <div className='overlay loading'>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Loading;
