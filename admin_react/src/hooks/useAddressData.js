import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Giả sử tệp data-location.json nằm trong /public
const DATA_URL = '/assets/js/data-location.json';

let cache = null; // Cache dữ liệu để tránh gọi lại

const useAddressData = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Tải dữ liệu chính
  useEffect(() => {
    const fetchData = async () => {
      if (cache) {
        setProvinces(cache);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(DATA_URL);
        cache = response.data; // Lưu vào cache
        setProvinces(response.data);
      } catch (error) {
        console.error('Failed to load address data', error);
        toast.error('Không thể tải dữ liệu địa chỉ.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Cập nhật Huyện khi Tỉnh thay đổi
  const handleProvinceChange = (provinceCode) => {
    if (!provinceCode) {
      setDistricts([]);
      setWards([]);
      return;
    }
    const selectedProvince = cache.find(p => p.Id === provinceCode);
    setDistricts(selectedProvince?.Districts || []);
    setWards([]); // Reset Phường/Xã
  };

  // 3. Cập nhật Phường/Xã khi Huyện thay đổi
  const handleDistrictChange = (districtCode) => {
    if (!districtCode) {
      setWards([]);
      return;
    }
    const selectedDistrict = districts.find(d => d.Id === districtCode);
    setWards(selectedDistrict?.Wards || []);
  };

  return {
    provinces,
    districts,
    wards,
    handleProvinceChange,
    handleDistrictChange,
    loading,
    // Hàm để tải district/ward khi edit
    setInitialDistricts: (provinceCode) => {
       if (!cache) return;
       const selectedProvince = cache.find(p => p.Id === provinceCode);
       setDistricts(selectedProvince?.Districts || []);
    },
    setInitialWards: (provinceCode, districtCode) => {
        if (!cache) return;
        const selectedProvince = cache.find(p => p.Id === provinceCode);
        const selectedDistrict = selectedProvince?.Districts.find(d => d.Id === districtCode);
        setWards(selectedDistrict?.Wards || []);
    }
  };
};

export default useAddressData;