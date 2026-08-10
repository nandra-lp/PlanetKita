_NOTES_
kode CSS Anda terbagi ke dalam folder src/styles/ dengan pembagian file sebagai berikut:

variables.css: Tempat menyimpan seluruh "DNA" desain Anda (palet warna, bayangan, dan kecepatan transisi). Ubah warna tema cukup dari file ini.
base.css: Pengaturan dasar untuk keseluruhan body, tipografi utama, tata letak background bermotif bintang, serta gaya focus state (aksesibilitas).
layout.css: Struktur pembungkus ruang (container), sistem grid, serta tata letak jarak antarseksi.
components.css: Ini file paling penting yang menampung seluruh gaya elemen UI: Navbar, Button, Form/Input, Card, Tabel, dan penataan ruang Hero Section.
utilities.css: Kelas utilitas ringan seperti notifikasi sukses/error, teks kecil, hingga semua efek animasi (seperti efek melayang floatBadge dan transisi transparan fadeUp).
responsive.css: Semua media queries untuk menyesuaikan tampilan di Tablet dan Smartphone (Mobile) kini terisolasi di sini agar tidak tumpang tindih.
