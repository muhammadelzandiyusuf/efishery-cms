import Select from 'react-select';
import { useCallback } from 'react';

const SelectCustom = ({ title, data, action, model, filter, onChange, value }) => {
  const selectData = useCallback((event) => {
    action(event.value, model);
  }, []);

  return (
    <Select
      options={data}
      onChange={(e) => {
        selectData(e);
        onChange(e);
      }}
      placeholder={title}
      filterOption={filter ? (param) => param.data.province === filter : null}
      value={value}
    />
  );
};

export default SelectCustom;
