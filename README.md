git clone  https://github.com/binhantt/my_polofi_Vue_admin/ 
 <h1>npm  i </h1>
 sever :   https://github.com/binhantt/severtype 

### **Chức năng và logic của đoạn code**

Đây là một đoạn code Vue 3 sử dụng Composition API để quản lý danh sách ngôn ngữ trong trang quản trị `/admin/ngon-ngu`. Nó bao gồm các chức năng chính như:

---

### **1. Quản lý danh sách ngôn ngữ**
- **fetchData()**: Lấy dữ liệu từ store và cập nhật danh sách hiển thị.
- **updatePageData()**: Cập nhật danh sách ngôn ngữ hiển thị theo trang hiện tại.
- **onItemsPerPageChange()**: Khi thay đổi số mục trên mỗi trang, sẽ load lại dữ liệu từ trang đầu tiên.

---

### **2. Phân trang**
- **buttonpage(totalPages, currentPage)**: Tạo danh sách các số trang hiển thị, gồm 3 trang trước và 2 trang sau trang hiện tại.
- **prevPage(id)**, **nextPage(id)**, **beforePage(id)**: Điều hướng giữa các trang bằng cách cập nhật query `page` trên URL.

---

### **3. Quản lý CRUD (Create, Read, Update, Delete)**
- **createItem()**: Thêm một ngôn ngữ mới.
  - Upload hình ảnh lên `imgbb` trước khi gửi request tạo mới.
- **updateItem(id)**: Cập nhật thông tin ngôn ngữ.
- **deleteButton(index, id)**: Xóa một ngôn ngữ khỏi danh sách.
- **openEditModal(ele)**: Mở modal chỉnh sửa.
- **openCreateModal()**: Mở modal tạo mới.
- **closeModal()**: Đóng cả hai modal.

---

### **4. Upload hình ảnh**
- **handleFileChange(event)**: Xử lý ảnh tải lên từ input file, tạo URL preview.
- **PostPhotos()**: Gửi ảnh lên `imgbb`, trả về URL để lưu vào hệ thống.

---

### **5. Tìm kiếm**
- **searchClick()**: Xử lý sự kiện tìm kiếm, nhưng hiện chỉ log giá trị tìm kiếm mà chưa có logic lọc dữ liệu.

---

### **6. Watcher & Lifecycle Hooks**
- **watch(route.query.page, callback)**: Theo dõi sự thay đổi `page` trên URL và cập nhật dữ liệu.
- **onMounted(fetchData)**: Khi component được mount, gọi API để lấy dữ liệu ban đầu.

---

### **Tóm tắt**
- **Quản lý danh sách ngôn ngữ** (hiển thị, phân trang, tải dữ liệu).
- **Chức năng CRUD** (thêm, sửa, xóa ngôn ngữ).
- **Upload và xử lý ảnh**.
- **Phân trang động**.
- **Xử lý sự kiện tìm kiếm** (chưa hoàn chỉnh).
- **Theo dõi thay đổi URL để cập nhật dữ liệu**.

---

Cấu trúc rõ ràng, nhưng có thể tối ưu hơn bằng cách tách các phần logic như upload ảnh, phân trang thành composable riêng.
