# OCEP — One Classroom, Bigger World

**Learn English. Build Friendships. Bridge Cultures.**

OCEP adalah kegiatan belajar bersama yang menghubungkan mahasiswa **Universitas Budi Luhur, Indonesia**, dengan peserta dari **Jepang** untuk mempraktikkan bahasa Inggris, mengenal budaya satu sama lain, dan membangun persahabatan internasional.

Belajar di OCEP berangkat dari interaksi: memulai percakapan, berbagi cerita, mendengarkan perspektif berbeda, dan saling mendukung agar lebih percaya diri dalam berkomunikasi. OCEP merupakan ruang kolaborasi dan kebersamaan, bukan layanan kursus berbayar atau lembaga pendidikan formal.

Repositori ini berisi website frontend untuk memperkenalkan OCEP dan menyediakan ruang bagi informasi kegiatan, dokumentasi, serta cerita peserta.

## Tentang website

Website menggunakan nuansa putih dan biru muda dengan aksen merah serta elemen visual Indonesia–Jepang. Tata letaknya responsif untuk desktop, tablet, dan ponsel.

- **Home:** pengenalan OCEP dan semangat belajar lintas budaya.
- **About:** tujuan komunitas, manfaat, dan proses belajar bersama.
- **Activities:** konsep percakapan bahasa Inggris, pertukaran budaya, diskusi kelompok, serta persahabatan dan kolaborasi.
- **Gallery:** ruang dokumentasi dengan filter kategori dan pratinjau gambar.
- **Experiences:** tempat untuk cerita dan pengalaman peserta.
- **FAQ & Contact:** penjelasan tentang OCEP dan ruang informasi kontak resmi.

Navigasi mendukung smooth scrolling dan menu mobile. Interaksi meliputi FAQ yang dapat dibuka, galeri dengan navigasi keyboard, dan dialog pengenalan OCEP. Animasi menghormati preferensi `prefers-reduced-motion`.

## Teknologi

| Teknologi | Kegunaan |
| --- | --- |
| React 19 | Komponen antarmuka |
| Vite 6 | Development server dan build produksi |
| Tailwind CSS 4 & CSS | Styling dan tampilan responsif |
| Lucide React | Ikon antarmuka |

Website sepenuhnya frontend, tanpa backend, database, login, atau autentikasi. Pengunjung tidak perlu akun untuk mengaksesnya.

## Menjalankan secara lokal

Siapkan Node.js 22 LTS atau versi lebih baru yang kompatibel, npm, dan Git.

```bash
git clone https://github.com/raaqil/OCEP.git
cd OCEP
npm ci
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal, biasanya `http://localhost:5173`.

Jika PowerShell memblokir eksekusi `npm.ps1`, gunakan `npm.cmd`, misalnya `npm.cmd ci` dan `npm.cmd run dev`.

## Build produksi

```bash
npm run build
npm run preview
```

Hasil build tersedia di folder `dist/`. Untuk deployment, unggah **isi folder `dist/`** ke hosting statis yang mendukung JavaScript modules. Perintah `npm run preview` digunakan untuk memeriksa build secara lokal.

### Menggunakan XAMPP

Jika proyek disimpan di `C:\xampp\htdocs\OCEP`, jalankan build dan aktifkan Apache, lalu buka:

```text
http://localhost/OCEP/dist/
```

Untuk pengembangan, tetap gunakan development server Vite. File sumber `index.html` tidak dapat langsung dijalankan melalui Apache karena kode React perlu diproses oleh Vite.

Folder `node_modules/`, `dist/`, berkas environment, dan hasil pemeriksaan lokal tidak disertakan dalam Git. Setelah clone, jalankan `npm ci` untuk memasang dependency dan `npm run build` untuk membuat ulang `dist/`.

## Struktur proyek

```text
OCEP/
├── public/
│   ├── assets/           # Logo dan gambar lokal
│   └── favicon.svg
├── src/
│   ├── main.jsx          # Komponen, konten, dan interaksi halaman
│   └── styles.css        # Styling, breakpoint, dan reduced motion
├── index.html            # Metadata dan entry point
├── package.json
├── package-lock.json
└── vite.config.js
```

## Mengubah konten

1. Edit teks, navigasi, konsep kegiatan, galeri, dan FAQ di `src/main.jsx`.
2. Sesuaikan warna, ukuran, spacing, dan tampilan responsif di `src/styles.css`.
3. Tambahkan atau ganti gambar di `public/assets/`, lalu perbarui path serta deskripsi `alt` pada komponennya.
4. Jalankan `npm run build` untuk memeriksa perubahan dan memperbarui versi produksi.

Logo Universitas Budi Luhur menggunakan berkas yang diberikan pemilik proyek, yaitu `public/assets/budi_luhur.png`.

## Status konten

Informasi yang belum tersedia dari penyelenggara disiapkan sebagai ruang konten yang dapat diperbarui:

- Foto pada kartu kegiatan dan galeri adalah **foto ilustratif**, bukan dokumentasi acara OCEP.
- Kartu Experiences berisi **pemantik cerita**, bukan testimoni peserta.
- Ilustrasi hero dibuat dengan AI untuk menggambarkan semangat kolaborasi Indonesia–Jepang; gambar tersebut bukan dokumentasi kegiatan nyata.
- Jadwal, kanal kontak, tautan pendaftaran, dan afiliasi institusi Jepang belum dicantumkan karena belum diberikan.

Ganti foto ilustratif dengan dokumentasi asli yang diizinkan untuk dipublikasikan. Tambahkan pengalaman peserta dengan persetujuan pemilik cerita, serta informasi kegiatan dan kontak yang sudah dikonfirmasi penyelenggara.

## Aset visual

Foto ilustratif berasal dari Unsplash dan disimpan secara lokal:

| Berkas | Sumber |
| --- | --- |
| `conversation.jpg` | [Berkas sumber Unsplash](https://images.unsplash.com/photo-1523240795612-9a054b0db644) |
| `culture.jpg` | [Berkas sumber Unsplash](https://images.unsplash.com/photo-1529156069898-49953e39b3ac) |
| `discussion.jpg` | [Berkas sumber Unsplash](https://images.unsplash.com/photo-1521737711867-e3b97375f902) |
| `friendship.jpg` | [Berkas sumber Unsplash](https://images.unsplash.com/photo-1511632765486-a01980e01a18) |

Ilustrasi AI `ocep-hero.webp` digunakan di hero dan sebagai dekorasi banner. Logo Budi Luhur dan aset pihak ketiga tetap mengikuti hak serta ketentuan pemiliknya.

## Pemeriksaan

Build produksi telah diperiksa dengan `npm run build`. Pemeriksaan browser mencakup lebar 320, 390, 768, 1024, dan 1440 piksel, navigasi mobile, FAQ, filter galeri, pratinjau foto, serta pemuatan aset. Saat ini belum tersedia perintah pengujian otomatis di `package.json`.

---

**Different cultures. Brighter tomorrows.**
