# Manajemen Produk - Next.js Frontend

Aplikasi **Manajemen Produk** berbasis **Next.js**, **TypeScript**, dan **TailwindCSS**, dibuat untuk keperluan skill test frontend developer. Aplikasi ini menggunakan **DummyJSON API** sebagai backend simulasi. Login tetap dapat dilakukan walau token tidak tersedia dari server.

bisa di lihat disini 👇
## https://kemenaker-amd-frontend-2025-b4o7.vercel.app/

## Fitur Utama

- **Autentikasi Login**
  - Login menggunakan username dan password dari DummyJSON.
  - Token disimpan di localStorage jika tersedia.
  - Jika token tidak tersedia, login tetap berhasil dan diarahkan ke dashboard.
  - Toggle show/hide password.
  
- **Dashboard**
  - Menampilkan jumlah total produk.
  - Daftar produk terbaru (opsional).
  - Navigasi ke halaman manajemen produk.
  
- **Manajemen Produk**
  - Tambah, edit, dan hapus produk.
  - Upload gambar produk dengan preview.
  - UI responsif dengan TailwindCSS dan komponen Shadcn UI.

- **State Management**
  - Menggunakan **Zustand** untuk menyimpan token.
  - Token optional, login tetap berjalan walau token tidak tersedia.

- **Routing**
  - Next.js App Router `(app/)`.
  - Layout terpisah untuk Auth dan Main Layout.
  - Breadcrumb / page title dinamis.
  - Proteksi halaman jika belum login.

## Teknologi yang Digunakan

- **Next.js 13+ (App Router)**
- **TypeScript**
- **TailwindCSS**
- **Shadcn/UI Components**
- **React Hook Form + Zod** untuk validasi form
- **Zustand** untuk state management
- **DummyJSON API** untuk simulasi backend

## Struktur Proyek
app/
├─ (auth)/ # Layout dan halaman login
│ ├─ page.tsx # Halaman login
│ └─ layout.tsx # Layout khusus auth
├─ (mainlayout)/ # Layout utama dashboard & produk
│ ├─ layout.tsx # Layout utama
│ ├─ dashboard/page.tsx # Dashboard
│ └─ products/
│ ├─ page.tsx # Daftar produk
│ ├─ add/page.tsx # Tambah produk
│ └─ edit/[id]/page.tsx # Edit produk
lib/
├─ api.ts # Axios instance
├─ auth.ts # Fungsi login/logout
├─ products.ts # Fungsi fetch/add/update/delete produk
Store/
├─ authStore.ts # Zustand store untuk token
components/
├─ ui/ # Komponen UI (Button, Input, dll)

---

## Instalasi

1. Clone repository:

```bash
git clone https://github.com/username/manajemen-produk-nextjs.git
cd manajemen-produk-nextjs
````
2. Install dependencies:

```bash
npm install
```

3. Jalankan development server:
   
```bash
npm run dev
```

Buka aplikasi di browser:

http://localhost:3000

Cara Login

Gunakan salah satu user DummyJSON (contoh):
```bash
{
  "username": "emilys",
  "password": "emilyspass"
}
```
Jika server memberikan token → disimpan di localStorage.

Jika server tidak memberikan token → login tetap berhasil, alert muncul:
Login berhasil, tapi token tidak tersedia dari server.

## Navigasi

- **Login Page** → `/login`  
- **Dashboard** → `/dashboard`  
- **Produk** → `/products`  
- **Tambah Produk** → `/products/add`  
- **Edit Produk** → `/products/edit/:id`  

## Fitur

- Login dengan atau tanpa token dari server.  
- Logout menghapus token dan redirect ke login.  
- Halaman protected hanya bisa diakses jika sudah login.  
- CRUD produk lengkap (Tambah, Edit, Hapus).  
- Breadcrumb dan judul halaman otomatis sesuai lokasi (Dashboard, Products, Add Product, Edit Product).  
- UI bersih dan responsif menggunakan Tailwind CSS + Shadcn UI.  
- Upload gambar produk dengan preview sebelum disimpan.  
- Navigasi intuitif dengan tombol “Back” untuk kembali ke halaman sebelumnya.  

## Struktur Folder

```text
/app
  /(auth)         → Layout dan halaman login
  /(mainlayout)   → Layout utama aplikasi (dashboard, produk, dll)
/components      → UI components
/lib             → API helper (auth, products)
/Store           → Zustand store untuk auth
```

Lisensi

MIT License © Gymnastiar Alma Ghifari
Sekolah: Politeknik Negeri Jember
Asal: Madiun
