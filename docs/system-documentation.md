# Tài Liệu Hệ Thống Đặt Lịch Khám Bệnh

## Mục Lục

1. [Giới Thiệu](#giới-thiệu)
2. [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
3. [Các Tính Năng Chính](#các-tính-năng-chính)
4. [Cấu Trúc Database](#cấu-trúc-database)
5. [Xử Lý Race Condition](#xử-lý-race-condition)
6. [API Endpoints](#api-endpoints)
7. [Quy Trình Đặt Lịch Khám](#quy-trình-đặt-lịch-khám)
8. [Quản Lý Trạng Thái](#quản-lý-trạng-thái)
9. [Hệ Thống Thông Báo](#hệ-thống-thông-báo)
10. [Quản Lý Chuyên Khoa](#quản-lý-chuyên-khoa)

## Giới Thiệu

Hệ thống đặt lịch khám bệnh là một nền tảng web cho phép bệnh nhân đặt lịch khám với bác sĩ, quản lý ca làm việc của bác sĩ, và theo dõi lịch sử khám bệnh. Hệ thống hỗ trợ các chức năng chính như quản lý lịch khám, ca làm việc của bác sĩ, và phân quyền người dùng.

## Công Nghệ Sử Dụng

- **Backend**: Node.js với NestJS framework
- **Database**: PostgreSQL với TypeORM
- **Authentication**: JWT với RBAC (Role-Based Access Control)
- **File Storage**: AWS S3
- **Caching**: Redis
- **Queue System**: Bull (cho xử lý email bất đồng bộ)
- **Transaction Management**: TypeORM với các mức isolation khác nhau

## Các Tính Năng Chính

### 1. Quản Lý Người Dùng

- Đăng ký/Đăng nhập
- Phân quyền người dùng theo role (Admin, Doctor, Patient)
- Quản lý thông tin cá nhân

### 2. Quản Lý Ca Làm Việc

- Đăng ký ca làm việc cho bác sĩ
- Quản lý lịch làm việc
- Kiểm tra xung đột ca làm việc
- Tự động tạo khung giờ khám

### 3. Quản Lý Lịch Khám

- Đặt lịch khám với bác sĩ
- Hủy lịch khám
- Xem lịch sử khám bệnh
- Nhận thông báo qua email

### 4. Quản Lý Bác Sĩ

- Quản lý thông tin bác sĩ
- Quản lý chuyên khoa
- Quản lý lịch làm việc
- Thống kê số lượng bệnh nhân

### 5. Phân Quyền

- Quản lý roles và permissions
- RBAC cho các hoạt động trong hệ thống
- Tự động gán permissions mới cho admin

## Cấu Trúc Database

### Các Entity Chính

1. **Users**

   - Thông tin người dùng
   - Role và permissions
   - Trạng thái hoạt động

2. **DoctorShifts**

   - Ca làm việc của bác sĩ
   - Thời gian bắt đầu/kết thúc
   - Trạng thái ca làm việc

3. **Appointments**

   - Thông tin lịch khám
   - Bác sĩ và bệnh nhân
   - Trạng thái lịch khám

4. **Shifts**

   - Thông tin ca làm việc
   - Thời gian bắt đầu/kết thúc
   - Số lượng bệnh nhân tối đa

5. **Roles**

   - Tên và mô tả role
   - Danh sách permissions

6. **Permissions**
   - Tên và mô tả permission
   - Các roles có permission

## Xử Lý Race Condition

### 1. Đăng Ký Ca Làm Việc

- Isolation Level: Serializable
- Kiểm tra xung đột ca làm việc
- Ngăn đăng ký trùng lịch

### 2. Đặt Lịch Khám

- Isolation Level: Serializable
- Kiểm tra số lượng bệnh nhân tối đa
- Tránh đặt lịch trùng

### 3. Hủy Lịch Khám

- Isolation Level: RepeatableRead
- Đảm bảo tính nhất quán khi hủy

### 4. Cập Nhật Thông Tin Bác Sĩ

- Transaction nguyên tử
- Kiểm tra tính hợp lệ của dữ liệu

### 5. Truy Vấn Lịch Khám

- Isolation Level: ReadCommitted
- Tối ưu cho hoạt động đọc

## API Endpoints

### I. Public APIs – Cho người bệnh (không cần đăng nhập)

| Method | Endpoint                   | Mô tả                                              |
| ------ | -------------------------- | -------------------------------------------------- |
| GET    | `/specializations`         | Danh sách chuyên khoa                              |
| GET    | `/specializations/:id`     | Chi tiết một chuyên khoa                           |
| GET    | `/doctors`                 | Danh sách bác sĩ                                   |
| GET    | `/doctors/:id`             | Thông tin bác sĩ theo ID                           |
| GET    | `/doctors/:id/shifts`      | Lịch làm việc của bác sĩ                           |
| GET    | `/public/shifts/available` | Danh sách ca trực khả dụng theo ngày + chuyên khoa |
| POST   | `/appointments`            | Đặt lịch khám mới                                  |
| GET    | `/appointments/:id/status` | Xem trạng thái cuộc hẹn (theo ID)                  |
| GET    | `/appointments/:id/verify` | Xác thực lịch hẹn bằng mã OTP/token                |

### II. Auth APIs – Đăng nhập, xác thực

| Method | Endpoint       | Mô tả                         |
| ------ | -------------- | ----------------------------- |
| POST   | `/auth/login`  | Đăng nhập                     |
| GET    | `/auth/me`     | Thông tin người dùng hiện tại |
| POST   | `/auth/logout` | Đăng xuất                     |

### III. Appointment Management – Quản lý lịch hẹn

| Method | Endpoint                   | Mô tả                         |
| ------ | -------------------------- | ----------------------------- |
| GET    | `/appointments`            | Danh sách lịch hẹn của bác sĩ |
| GET    | `/appointments/:id`        | Chi tiết lịch hẹn             |
| PUT    | `/appointments/:id/status` | Cập nhật trạng thái lịch hẹn  |
| PUT    | `/appointments/:id`        | Cập nhật nội dung lịch hẹn    |

### IV. Doctor Self-Management – Thông tin cá nhân

| Method | Endpoint           | Mô tả                        |
| ------ | ------------------ | ---------------------------- |
| GET    | `/doctors/profile` | Thông tin cá nhân của bác sĩ |
| PUT    | `/doctors/profile` | Cập nhật thông tin cá nhân   |

### V. Shift Management – Ca trực

#### Bác sĩ

| Method | Endpoint                             | Mô tả                            |
| ------ | ------------------------------------ | -------------------------------- |
| GET    | `/doctors/shifts`                    | Lấy danh sách ca trực của bác sĩ |
| POST   | `/doctors/shifts/:shift_id/assign`   | Đăng ký ca trực                  |
| DELETE | `/doctors/shifts/:shift_id/unassign` | Hủy ca trực                      |

#### Trưởng khoa (Head of Department)

| Method | Endpoint                                | Mô tả                     |
| ------ | --------------------------------------- | ------------------------- |
| GET    | `/admin/shifts`                         | Danh sách toàn bộ ca trực |
| GET    | `/admin/shifts/:id`                     | Chi tiết ca trực          |
| POST   | `/admin/shifts`                         | Tạo ca trực               |
| PUT    | `/admin/shifts/:id`                     | Cập nhật ca trực          |
| DELETE | `/admin/shifts/:id`                     | Xoá ca trực               |
| POST   | `/admin/shifts/:shift_id/assign-doctor` | Gán bác sĩ vào ca trực    |

### VI. Notification APIs – Gửi thông báo

| Method | Endpoint                          | Mô tả                                          |
| ------ | --------------------------------- | ---------------------------------------------- |
| POST   | `/notifications/send-to-customer` | Gửi thông báo xác nhận đặt lịch tới khách hàng |
| POST   | `/notifications/send-to-doctor`   | Gửi thông báo cho bác sĩ khi có lịch hẹn mới   |
| POST   | `/notifications/broadcast`        | Gửi thông báo hàng loạt (reminder)             |

### VII. Báo Cáo

| Method | Endpoint                                    | Mô tả                           | Query Parameters        |
| ------ | ------------------------------------------- | ------------------------------- | ----------------------- |
| GET    | `/appointments/report/doctor-schedules`     | Báo cáo lịch trực của bác sĩ    | start, end (ISO format) |
| GET    | `/appointments/report/patient-appointments` | Báo cáo lịch khám của bệnh nhân | start, end, doctor_id   |

## Phân Quyền Đề Xuất

| Role               | Quyền hạn                                                |
| ------------------ | -------------------------------------------------------- |
| public             | Xem thông tin, đặt lịch                                  |
| doctor             | Quản lý lịch hẹn, đăng ký ca trực, cập nhật hồ sơ        |
| head_of_department | Tất cả quyền bác sĩ + quản lý ca trực, bác sĩ trong khoa |

## Quy Trình Đặt Lịch Khám

### 1. Bệnh Nhân

1. Đăng nhập vào hệ thống
2. Chọn bác sĩ và chuyên khoa
3. Xem lịch làm việc của bác sĩ
4. Chọn khung giờ khám phù hợp
5. Xác nhận đặt lịch
6. Nhận email xác nhận

### 2. Bác Sĩ

1. Đăng nhập vào hệ thống
2. Đăng ký ca làm việc
3. Xem danh sách bệnh nhân đã đặt lịch
4. Cập nhật trạng thái lịch khám
5. Nhận thông báo khi có lịch khám mới

### 3. Admin

1. Quản lý thông tin bác sĩ
2. Quản lý chuyên khoa
3. Xem thống kê số lượng bệnh nhân
4. Quản lý roles và permissions

## Quản Lý Trạng Thái

### 1. Trạng Thái Ca Làm Việc

- `PENDING`: Ca làm việc đang chờ xác nhận
- `ACTIVE`: Ca làm việc đang hoạt động
- `CANCELLED`: Ca làm việc đã bị hủy
- `COMPLETED`: Ca làm việc đã hoàn thành

### 2. Trạng Thái Lịch Khám

- `PENDING`: Lịch khám đang chờ xác nhận
- `CONFIRMED`: Lịch khám đã được xác nhận
- `CANCELLED`: Lịch khám đã bị hủy
- `COMPLETED`: Lịch khám đã hoàn thành

## Hệ Thống Thông Báo

### 1. Email Thông Báo

- Xác nhận đặt lịch khám
- Thông báo hủy lịch khám
- Nhắc nhở lịch khám
- Thông báo thay đổi lịch khám

### 2. Thông Báo Trong Hệ Thống

- Thông báo lịch khám mới
- Thông báo thay đổi ca làm việc
- Thông báo hủy lịch khám
- Thông báo nhắc nhở

## Quản Lý Chuyên Khoa

### 1. Danh Sách Chuyên Khoa

- Nội khoa
- Ngoại khoa
- Sản phụ khoa
- Nhi khoa
- Tai mũi họng
- Răng hàm mặt
- Da liễu
- Mắt

### 2. Quản Lý Chuyên Khoa

- Thêm chuyên khoa mới
- Cập nhật thông tin chuyên khoa
- Xóa chuyên khoa
- Gán bác sĩ vào chuyên khoa

## Bảo Mật

- JWT Authentication
- RBAC Authorization
- SQL injection prevention
- XSS protection
- CORS configuration

## Hiệu Năng

- Redis caching cho lịch khám
- Bull queue cho email thông báo
- Transaction isolation levels
- Database indexing

## Tương Lai

- Tích hợp thanh toán trực tuyến
- Mobile app
- API documentation với Swagger
- Unit tests và integration tests
- Hệ thống đánh giá bác sĩ

## Bảng Chức Năng Chi Tiết & Phân Quyền

| STT | Chức năng                       | Mô tả chi tiết                                                       | Admin | Doctor | Patient |
| --- | ------------------------------- | -------------------------------------------------------------------- | ----- | ------ | ------- |
| 1   | Quản lý tài khoản người dùng    | Xem, tạo, cập nhật, xóa user, phân quyền                             | ✅    | ❌     | ❌      |
| 2   | Tạo tài khoản bệnh nhân         | Tạo user mới với role Patient                                        | ✅    | ❌     | ❌      |
| 3   | Cập nhật thông tin cá nhân      | Cập nhật thông tin user hiện tại                                     | ✅    | ✅     | ✅      |
| 4   | Xóa tài khoản                   | Xóa mềm tài khoản user                                               | ✅    | ❌     | ❌      |
| 5   | Tạo lịch hẹn                    | Bệnh nhân tạo yêu cầu lịch, hoặc admin/doctor tạo cho bệnh nhân khác | ✅    | ✅     | ✅      |
| 6   | Xem danh sách lịch hẹn          | Admin xem tất cả, Doctor xem lịch mình, Patient xem lịch của mình    | ✅    | ✅     | ✅      |
| 7   | Cập nhật lịch hẹn               | Admin và Doctor cập nhật, Patient không được sửa sau khi tạo         | ✅    | ✅     | ❌      |
| 8   | Hủy lịch hẹn                    | Cả 3 vai trò có thể hủy lịch của mình                                | ✅    | ✅     | ✅      |
| 9   | Duyệt lịch hẹn                  | Doctor/Admin xác nhận lịch hẹn                                       | ✅    | ✅     | ❌      |
| 10  | Gửi thông báo nhắc lịch hẹn     | Tự động hoặc thủ công gửi thông báo                                  | ✅    | ✅     | ❌      |
| 11  | Nhận thông báo                  | Nhận notification từ hệ thống                                        | ✅    | ✅     | ✅      |
| 12  | Xem lịch sử thông báo           | Xem các thông báo trước đó đã nhận được                              | ✅    | ✅     | ✅      |
| 13  | Tạo loại dịch vụ khám           | Quản lý loại hình khám (general, specialized...)                     | ✅    | ✅     | ❌      |
| 14  | Xem danh sách bệnh nhân đã khám | Doctor xem lịch sử bệnh nhân mình đã khám                            | ✅    | ✅     | ❌      |
| 15  | Thống kê lịch hẹn               | Thống kê số lượng, xu hướng, tổng kết lịch hẹn                       | ✅    | ✅     | ❌      |
| 16  | Tạo hồ sơ bệnh án               | Doctor tạo bệnh án cho bệnh nhân                                     | ✅    | ✅     | ❌      |
| 17  | Xem hồ sơ bệnh án               | Doctor/Admin xem được, Patient xem hồ sơ của mình                    | ✅    | ✅     | ✅      |
