import Select from 'react-select';
import { useCallback } from 'react';

const SelectCustom = ({ title, data, action, model, filter, value }) => {
  const selectData = useCallback((event) => {
    action(event.value, model);
  }, []);

  return (
    <Select
      value={value}
      options={data}
      onChange={(e) => selectData(e)}
      placeholder={title}
      filterOption={filter ? (param) => param.data.province === filter : null}
    />
  );
};

export default SelectCustom;
