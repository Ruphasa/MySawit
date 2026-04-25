# 🌴 My Sawit - Plantation Management System

**My Sawit** adalah aplikasi manajemen perkebunan kelapa sawit berbasis web yang dirancang untuk membantu administrator memantau data wilayah dan laporan panen harian secara efisien. Aplikasi ini dibangun dengan arsitektur **Hybrid MVC/API** menggunakan framework NestJS.

---

## 📸 Screenshot Aplikasi

| Halaman Login | Dashboard / Wilayah |
| :---: | :---: |
| ![Login Screen](/img/login.png) | ![Wilayah Screen](/img/wilayah.png) |

---

## 🛠️ Desain Database (ERD)

Aplikasi ini menggunakan relasi database PostgreSQL yang dikelola melalui TypeORM. Berikut adalah struktur relasinya:

|![Schema Database](/img/schema.png)

---

## 📦 Dependency Utama

Berikut adalah "Alat Perang" utama yang digunakan dalam project ini:

| Kategori | Library |
| :--- | :--- |
| **Framework** | NestJS (Core, Config, Passport, TypeORM) |
| **Database** | PostgreSQL (Supabase Connection Pooler) |
| **View Engine** | Handlebars (HBS) |
| **Styling** | Tailwind CSS (CDN/Custom) |
| **Security** | Passport.js, Bcrypt, Express-Session |
| **Validation** | Class-Validator, Class-Transformer |

---

## 🚀 Informasi Untuk Developer Selanjutnya

### 1. Setup Awal
Pastikan Anda sudah menginstal Node.js dan NPM, lalu jalankan:
```bash
npm install
```

### 2. Konfigurasi Environment (`.env`)
Buat file `.env` di root project dengan isi berikut:
```env
DB_HOST=aws-1-ap-northeast-1.pooler.supabase.com
DB_PORT=6543
DB_USER=postgres.[PROJECT_ID]
DB_PASSWORD=[PASSWORD]
DB_NAME=postgres
SESSION_SECRET=secret-key
PORT=3000
```

### 3. Arsitektur Hybrid MVC
Aplikasi ini menggunakan `SmartResponseInterceptor` yang secara otomatis:
- Me-render template `.hbs` jika request datang dari browser.
- Mengirimkan data JSON jika request memiliki header `Accept: application/json`.

### 4. Tips Pengembangan
- **Menambahkan Modul Baru**: Gunakan `nest generate module modules/nama-modul`.
- **Styling**: Gunakan Tailwind CSS yang sudah terintegrasi di `views/layouts/main.hbs`.
- **Security**: Semua controller baru yang membutuhkan login harus menggunakan `@UseGuards(AuthenticatedGuard)`.

---

## 📜 Lisensi
Project ini dikembangkan untuk tantangan teknis magang (Internship Challenge 2026).

---
*Dibuat dengan ❤️ :D*
