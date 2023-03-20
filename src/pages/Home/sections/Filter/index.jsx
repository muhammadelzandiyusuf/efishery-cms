import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelectCustom from '@/components/Select';

import {
  citySelector,
  getFilterList,
  getSortList,
  provinceSelector,
  sizeSelector,
} from '../../../../redux';

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

  const sortData = (params, model) => {
    const obj = {
      model: model,
      value: params,
    };
    console.log('log');
    dispatch(getSortList(obj));
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
        <SelectCustom title='Urutkan' data={listOfSort} model='sort' action={sortData} />
      </div>
    </div>
  );
};

export default Filter;
