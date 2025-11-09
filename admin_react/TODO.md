# TODO: Complete AngularJS to React Admin Panel Conversion

## 1. Update apiService.js ✅
- Change '/order/getAll' to '/bill/getAll'
- Add missing API functions: getProductDetail, updateProduct, getUserDetail, updateUser, getOrderDetail, updateOrderStatus, etc.
- Ensure all endpoints match AngularJS (use 'bill' for orders)

## 2. Create StatisticalPage.jsx ✅
- Create admin_react/src/pages/statistical/StatisticalPage.jsx
- Implement revenue chart similar to Dashboard (bar chart by month)
- Add month filter dropdown

## 3. Uncomment routes in routes/index.js ✅
- Uncomment statistical route
- Uncomment product edit route

## 4. Uncomment statistical link in SidebarComponent.jsx ✅
- Enable the statistical menu item

## 5. Update DashboardPage.jsx ✅
- Calculate totalRevenue from delivered orders (status === 3)
- Fetch orders and compute revenue

## 6. Add pagination to ProductPage.jsx ✅
- Implement pagination state and UI
- Update fetchProducts to support page/limit params

## 7. Update OrderPage.jsx ✅
- Change API call to '/bill/getAll'
- Add pagination similar to ProductPage

## 8. Add export to OrderDetailPage.jsx
- Add export to Excel and PDF buttons
- Implement export functions (install xlsx, jspdf if needed)

## 9. Add block/unblock to UserPage.jsx
- Add toggle button for user active status
- Update API to support block/unblock

## 10. Add address selection to UserAddPage.jsx
- Add province/district dropdowns
- Use data-location.json or API for address data

## 11. Ensure file uploads in product forms
- Update ProductAddPage and ProductEditPage for image uploads
- Handle FormData in API calls

## 12. Verify login/logout flow
- Ensure matches AngularJS behavior
- Check token handling and redirects

## Followup Steps
- Install dependencies: xlsx, jspdf, chart.js (if not already)
- Test all pages for functionality
- Verify UI matches Angular templates
- Ensure file uploads work
- Check API endpoints match Angular
