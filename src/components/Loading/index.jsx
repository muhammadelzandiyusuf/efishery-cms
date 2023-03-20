import './loading.scss';

const Loading = ({ width, height, color }) => {
  return (
    <div className='loading'>
      <div className='lds-ring' style={{ width, height }}>
        <div
          style={{
            width,
            height,
            border: `4px solid ${color}`,
            borderColor: `${color} transparent transparent transparent`,
          }}
        ></div>
        <div
          style={{
            width,
            height,
            border: `4px solid ${color}`,
            borderColor: `${color} transparent transparent transparent`,
          }}
        ></div>
        <div
          style={{
            width,
            height,
            border: `4px solid ${color}`,
            borderColor: `${color} transparent transparent transparent`,
          }}
        ></div>
        <div
          style={{
            width,
            height,
            border: `4px solid ${color}`,
            borderColor: `${color} transparent transparent transparent`,
          }}
        ></div>
      </div>
    </div>
  );
};
export default Loading;
