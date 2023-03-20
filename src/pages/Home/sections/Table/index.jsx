import { useLocation } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { BiDetail } from 'react-icons/bi';

import Pagination from '@/components/Pagination';
import { getSliceData } from '@/utils/getSliceData';
import { convertDate } from '@/utils/convertDate';
import { formatCurrency } from '@/utils/formatCurrency';

import '@/assets/scss/table.scss';

const TableCustom = ({ bodies, handleShowDelete, handleShowFormEdit, handleDetail }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const limit = 10;
  const getSlice = getSliceData(params, limit);

  return (
    <div className='table'>
      <div className='desktop-view'>
        <table>
          <thead>
            <tr>
              <th>Komoditas</th>
              <th>Provinsi</th>
              <th>Kota</th>
              <th>Ukuran</th>
              <th>Harga</th>
              <th>Tanggal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bodies.slice(getSlice.from, getSlice.to).map((body, index) => {
              if (body.uuid === null) return;
              return (
                <tr key={index}>
                  <td>{body.komoditas !== null ? body.komoditas : '-'}</td>
                  <td>{body.area_provinsi !== null ? body.area_provinsi : '-'}</td>
                  <td>{body.area_kota !== null ? body.area_kota : '-'}</td>
                  <td>{body.size}</td>
                  <td>Rp. {formatCurrency(body.price, undefined, '.')}</td>
                  <td>{convertDate(body.tgl_parsed, 'DD-MM-YYYY')}</td>
                  <td>
                    <div>
                      <span
                        onClick={() => handleDetail(body.uuid)}
                        className={'mr-16p cursor-pointer'}
                      >
                        <BiDetail className='icon' /> Detail
                      </span>
                      <span onClick={() => handleShowFormEdit(body.uuid)} className='table-button'>
                        <AiOutlineEdit className='icon' /> Edit
                      </span>
                      <span onClick={() => handleShowDelete(body.uuid)} className='cursor-pointer'>
                        <BsTrash className='icon' /> Hapus
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='mobile-view'>
        {bodies.slice(getSlice.from, getSlice.to).map((body, index) => {
          return (
            <div className='table-box' key={index}>
              <div className='table-label'>
                <div className='table-label-property'>Komoditas</div>
                {body.komoditas !== null ? body.komoditas : '-'}
              </div>
              <div className='table-label'>
                <div className='table-label-property'>Provinsi</div>
                {body.area_provinsi !== null ? body.area_provinsi : '-'}
              </div>
              <div className='table-label'>
                <div className='table-label-property'>Kota</div>
                {body.area_kota !== null ? body.area_kota : '-'}
              </div>
              <div className='table-label'>
                <div className='table-label-property'>Ukuran</div>
                {body.size}
              </div>
              <div className='table-label'>
                <div className='table-label-property'>Harga</div>
                Rp. {formatCurrency(body.price, undefined, '.')}
              </div>
              <div className='table-label'>
                <div className='table-label-property'>Tanggal</div>
                {convertDate(body.tgl_parsed, 'DD MMMM YYYY')}
              </div>
              <div className='table-action'>
                <span onClick={() => handleDetail(body.uuid)} className='table-button'>
                  <BiDetail className='icon' /> Detail
                </span>
                <span onClick={() => handleShowFormEdit(body.uuid)} className='table-button'>
                  <AiOutlineEdit className='icon' /> Edit
                </span>
                <span onClick={() => handleShowDelete(body.uuid)} className='cursor-pointer'>
                  <BsTrash className='icon' /> Delete
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {bodies.length === 0 && (
        <div className='alert'>
          <h5 className='alert-title'>Data yang anda cari tidak ditemukan</h5>
        </div>
      )}
      <Pagination total={bodies.length} limit={limit} current={getSlice.page} />
    </div>
  );
};

export default TableCustom;
