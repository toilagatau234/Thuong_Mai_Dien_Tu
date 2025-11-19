const express = require('express');
const router = express.Router();
const {
    getUserAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} = require('../controllers/addressController');
const { protect: auth } = require('../middleware/auth.js'); 

console.log('GIÁ TRỊ "auth" (trong addressRoutes):', auth);
console.log('GIÁ TRỊ "getUserAddresses" (trong addressRoutes):', getUserAddresses);

router.get('/', auth, getUserAddresses);
router.post('/', auth, addAddress);
router.put('/:id', auth, updateAddress);
router.delete('/:id', auth, deleteAddress);
router.patch('/:id/set-default', auth, setDefaultAddress);

module.exports = router;