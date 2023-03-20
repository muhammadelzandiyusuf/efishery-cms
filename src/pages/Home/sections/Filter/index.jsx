import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelectCustom from '@/components/Select';

import { citySelector, getFilterList, provinceSelector, sizeSelector } from '../../../../redux';

import './filter.scss';
import { listOfSort } from '@/constants/sort';

const Filter = () => {
  const dispatch = useDispatch();
  const provinces = useSelector(provinceSelector);
  const cities = useSelector(citySelector);
  const sizes = useSelector(sizeSelector);
  const [getProvince, setProvince] = useState('');

  const filterData = (params, model) => {
    const obj = {
      model: model,
      value: params,
    };
    if (model === 'province') {
      setProvince(params);
    }
    dispatch(getFilterList(obj));
  };

  return (
    <div className='filter'>
      <div className='filter-title'>Filter:</div>
      <div className='filter-wrapper'>
        <SelectCustom title='Provinsi' data={provinces} model='province' action={filterData} />
        <SelectCustom
          title='Kota'
          data={cities}
          model='city'
          action={filterData}
          filter={getProvince}
        />
        <SelectCustom title='Ukuran' data={sizes} model='size' action={filterData} />
        <SelectCustom title='Urutkan' data={listOfSort} model='sort' action={filterData} />
      </div>
    </div>
  );
};

export default Filter;
