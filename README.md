# Universal Mobile Mapping GIS — PWA

Aplikasi pemetaan lapangan offline-first (titik, garis, poligon, GPS, foto, foto udara PMTiles). Folder ini adalah frontend PWA untuk **GitHub Pages**; backend berjalan di Google Apps Script milik organisasi Anda.

## Isi (5 berkas)
| Berkas | Fungsi |
|---|---|
| `index.html` | Aplikasi lengkap (UI, peta, sinkronisasi offline) |
| `sw.js` | Service worker: cache aplikasi, pustaka peta, tile yang pernah dilihat |
| `manifest.json` | Metadata instalasi PWA (Add to Home Screen) |
| `icon-512.png` | Ikon aplikasi |
| `README.md` | Dokumen ini |

## Publikasi
1. Buat repository (boleh privat dengan GitHub Pro, atau publik — **tidak ada data/secret di berkas ini**).
2. Unggah ke-5 berkas ke root branch `main`.
3. **Settings › Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
4. Buka `https://<akun>.github.io/<repo>/`.
5. Di layar login buka **Pengaturan server**, tempel URL Web App Apps Script (`https://script.google.com/macros/s/…/exec`) → *Simpan & uji koneksi*.
   *Alternatif:* edit baris `var CONFIG = { MODE: 'remote', API_URL: '' …` di `index.html` dan isi `API_URL` agar semua pengguna otomatis terhubung.
6. Di ponsel: menu browser → *Tambahkan ke layar utama*.

Opsional: unggah juga `demo.html` (folder 04_DEMO) ke repo yang sama untuk halaman demo.

## Offline
- Buka aplikasi sekali saat online (memuat & menyimpan pustaka peta).
- Data yang direkam saat offline disimpan di perangkat dan dikirim otomatis saat online.
- Foto udara: menu Layer → *Unduh untuk offline* (URL PMTiles) atau *Buka file lokal* (.pmtiles). File disimpan di penyimpanan browser — gunakan arsip yang sudah di-clip per area (`pmtiles extract`) agar ukurannya wajar.
- Host PMTiles online harus mendukung **HTTP Range** dan **CORS** (mis. Cloudflare R2, S3, GitHub Pages untuk file < 100 MB).

## Pembaruan versi
Ganti `index.html` (dan `sw.js` bila berubah). Service worker memakai nama cache versi; pengguna mendapat versi baru setelah aplikasi dibuka ulang.

## Lisensi
Perangkat lunak berlisensi komersial. Pustaka: MapLibre GL JS & PMTiles (BSD-3-Clause). Peta © OpenStreetMap contributors.
