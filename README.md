# Universal Mobile Mapping GIS — PWA

Aplikasi pemetaan lapangan offline-first (titik, garis, poligon, GPS, foto, foto udara PMTiles). Folder ini adalah frontend PWA untuk **GitHub Pages**; backend berjalan di Google Apps Script milik organisasi Anda.

## Isi (9 berkas — unggah SEMUA ke folder yang sama)
| Berkas | Fungsi |
|---|---|
| `index.html` | Aplikasi lengkap (UI, peta, sinkronisasi offline) |
| `sw.js` | Service worker: cache aplikasi, pustaka peta, tile yang pernah dilihat |
| `manifest.json` | Metadata instalasi PWA (Add to Home Screen) |
| `icon-192.png`, `icon-512.png` | Ikon aplikasi (ukuran asli, wajib untuk instalasi Android) |
| `icon-maskable-512.png` | Ikon adaptif Android (bentuk bulat/kotak membulat) |
| `apple-touch-icon.png` | Ikon iPhone/iPad |
| `.nojekyll` | Agar GitHub Pages menyajikan file apa adanya (file tersembunyi — unggah lewat `git` atau buat file kosong bernama `.nojekyll` di GitHub) |
| `README.md` | Dokumen ini |

## Publikasi
1. Buat repository (boleh privat dengan GitHub Pro, atau publik — **tidak ada data/secret di berkas ini**).
2. Unggah semua berkas di atas ke root branch `main` (atau ke subfolder yang sama — semua alamat relatif).
3. **Settings › Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
4. Buka `https://<akun>.github.io/<repo>/`.
5. Di layar login buka **Pengaturan server**, tempel URL Web App Apps Script (`https://script.google.com/macros/s/…/exec`) → *Simpan & uji koneksi*.
   *Alternatif:* edit baris `var CONFIG = { MODE: 'remote', API_URL: '' …` di `index.html` dan isi `API_URL` agar semua pengguna otomatis terhubung.
6. Di ponsel Android buka alamat GitHub Pages di **Chrome** (bukan dari dalam WhatsApp/Instagram) → tombol **📲 Pasang aplikasi** di layar login, atau menu ⋮ → **Instal aplikasi**. iPhone: Safari → Bagikan → **Tambahkan ke Layar Utama**.
   Jika opsi instal tidak muncul: buka **Tentang & Legal › Periksa kesiapan instalasi** — semua butir harus ✅. Alamat `script.google.com` (versi Apps Script) memang tidak dapat dipasang.
   Setelah memperbarui berkas, buka aplikasi sekali saat online lalu tarik ke bawah (reload) agar service worker versi baru aktif.

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
