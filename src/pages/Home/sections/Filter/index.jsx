import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import SelectCustom from '@/components/Select';
import { listOfSort } from '@/constants/sort';
import Button from '@/components/Button';

import {
  citySelector,
  getFilterList,
  getSortList,
  provinceSelector,
  resetFilter,
  sizeSelector,
} from '../../../../redux';

import './filter.scss';

const Filter = () => {
  const dispatch = useDispatch();
  const provinces = useSelector(provinceSelector);
  const cities = useSelector(citySelector);
  const sizes = useSelector(sizeSelector);
  const [getProvince, setProvince] = useState('');

  const defaultValues = {
    province: '',
    city: '',
    size: '',
    sort: '',
  };
  const { reset, control, handleSubmit } = useForm({ defaultValues });

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
    dispatch(getSortList(obj));
  };

  const handleResetFilter = () => {
    dispatch(resetFilter());
    reset(defaultValues);
  };

  return (
    <form className='filter' onSubmit={handleSubmit(handleResetFilter)}>
      <div className='filter-title'>
        Filter:
        <Button type='submit' variant='primary'>
          Reset Filter
        </Button>
      </div>
      <div className='filter-wrapper'>
        <Controller
          render={({ field: { onChange, value } }) => (
            <SelectCustom
              title='Provinsi'
              data={provinces}
              model='province'
              action={filterData}
              onChange={onChange}
              value={value}
            />
          )}
          name='province'
          control={control}
          defaultValue=''
        />
        <Controller
          render={({ field: { onChange, value } }) => (
            <SelectCustom
              title='Kota'
              data={cities}
              model='city'
              action={filterData}
              filter={getProvince}
              onChange={onChange}
              value={value}
            />
          )}
          name='city'
          control={control}
          defaultValue=''
        />
        <Controller
          render={({ field: { onChange, value } }) => (
            <SelectCustom
              title='Ukuran'
              data={sizes}
              model='size'
              action={filterData}
              onChange={onChange}
              value={value}
            />
          )}
          name='size'
          control={control}
          defaultValue=''
        />
        <Controller
          render={({ field: { onChange, value } }) => (
            <SelectCustom
              title='Urutkan'
              data={listOfSort}
              model='sort'
              action={sortData}
              onChange={onChange}
              value={value}
            />
          )}
          name='sort'
          control={control}
          defaultValue=''
        />
      </div>
    </form>
  );
};

export default Filter;
