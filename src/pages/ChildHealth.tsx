
import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Search, Calendar, Info } from "lucide-react";
import { motion } from "framer-motion";

// Article categories
const CATEGORIES = [
  { id: "1000hpp", name: "1000 Hari Pertama Kehidupan" },
  { id: "nutrition", name: "Nutrisi Anak" },
  { id: "immunization", name: "Imunisasi" },
  { id: "development", name: "Stimulasi Perkembangan" },
  { id: "disease", name: "Penyakit pada Anak" },
  { id: "hygiene", name: "Kebersihan dan Sanitasi" }
];

// Sample articles
const ARTICLES = [
  {
    id: 1,
    title: "Pentingnya 1000 Hari Pertama Kehidupan untuk Mencegah Stunting",
    category: "1000hpp",
    summary: "1000 hari pertama kehidupan, dari masa kehamilan hingga anak berusia 2 tahun, adalah periode emas yang menentukan kualitas kesehatan dan perkembangan anak di masa depan.",
    imageUrl: "https://source.unsplash.com/random/800x600/?baby",
    content: `
      <p class="mb-4">1000 hari pertama kehidupan adalah periode penting yang dimulai sejak saat konsepsi hingga anak berusia 2 tahun. Periode ini merupakan kesempatan emas untuk memastikan tumbuh kembang optimal dan mencegah stunting pada anak.</p>
      
      <h3 class="text-lg font-semibold mb-2">Mengapa 1000 Hari Pertama Sangat Penting?</h3>
      <ul class="list-disc pl-5 mb-4">
        <li>Otak berkembang sangat pesat, mencapai 80% dari ukuran otak dewasa</li>
        <li>Pembentukan organ-organ tubuh terjadi secara maksimal</li>
        <li>Perkembangan sistem kekebalan tubuh</li>
        <li>Pertumbuhan tinggi badan paling cepat terjadi pada periode ini</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-2">Apa yang Dapat Dilakukan Orang Tua?</h3>
      <ol class="list-decimal pl-5 mb-4">
        <li>
          <strong>Saat Kehamilan:</strong>
          <ul class="list-disc pl-5 mb-2">
            <li>Konsumsi makanan bergizi seimbang</li>
            <li>Rutin memeriksakan kehamilan ke tenaga kesehatan</li>
            <li>Konsumsi tablet tambah darah</li>
            <li>Hindari merokok, alkohol, dan obat-obatan terlarang</li>
          </ul>
        </li>
        <li>
          <strong>Setelah Bayi Lahir:</strong>
          <ul class="list-disc pl-5 mb-2">
            <li>Berikan ASI eksklusif selama 6 bulan pertama</li>
            <li>Lanjutkan pemberian ASI hingga usia 2 tahun</li>
            <li>Berikan MPASI yang bergizi sejak usia 6 bulan</li>
            <li>Pantau pertumbuhan anak secara rutin</li>
            <li>Berikan imunisasi lengkap</li>
            <li>Stimulasi perkembangan anak</li>
          </ul>
        </li>
      </ol>
      
      <p class="mb-4">Dampak kekurangan gizi pada 1000 hari pertama bersifat permanen dan sulit dikoreksi. Stunting tidak hanya memengaruhi tinggi badan, tetapi juga perkembangan otak, sistem kekebalan tubuh, dan risiko penyakit di masa depan.</p>
      
      <p>Dengan memastikan nutrisi dan perawatan optimal pada 1000 hari pertama kehidupan, kita dapat membantu anak-anak mencapai potensi pertumbuhan dan perkembangan mereka secara maksimal.</p>
    `,
    published: "10 April 2025"
  },
  {
    id: 2,
    title: "Panduan Nutrisi Seimbang untuk Anak Usia 1-5 Tahun",
    category: "nutrition",
    summary: "Memenuhi kebutuhan nutrisi anak usia 1-5 tahun sangat penting untuk mendukung pertumbuhan dan perkembangan optimal mereka. Panduan ini membantu orang tua menyusun menu makanan bergizi seimbang.",
    imageUrl: "https://source.unsplash.com/random/800x600/?healthy,food",
    content: `
      <p class="mb-4">Nutrisi seimbang sangat penting untuk mendukung pertumbuhan dan perkembangan anak usia 1-5 tahun. Berikut panduan nutrisi untuk membantu orang tua menyusun menu makanan bergizi:</p>
      
      <h3 class="text-lg font-semibold mb-2">Kebutuhan Nutrisi Harian</h3>
      <table class="w-full mb-4 border-collapse">
        <thead>
          <tr class="bg-semar-green/10">
            <th class="border p-2 text-left">Usia</th>
            <th class="border p-2 text-left">Kalori</th>
            <th class="border p-2 text-left">Protein</th>
            <th class="border p-2 text-left">Karbohidrat</th>
            <th class="border p-2 text-left">Lemak</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">1-3 tahun</td>
            <td class="border p-2">1000-1400 kcal</td>
            <td class="border p-2">13-19 g</td>
            <td class="border p-2">130 g</td>
            <td class="border p-2">30-40 g</td>
          </tr>
          <tr>
            <td class="border p-2">4-5 tahun</td>
            <td class="border p-2">1200-1600 kcal</td>
            <td class="border p-2">19-25 g</td>
            <td class="border p-2">130 g</td>
            <td class="border p-2">25-35 g</td>
          </tr>
        </tbody>
      </table>
      
      <h3 class="text-lg font-semibold mb-2">Makanan yang Direkomendasikan</h3>
      <ul class="list-disc pl-5 mb-4">
        <li>
          <strong>Karbohidrat:</strong> Nasi, roti gandum, kentang, ubi, jagung, dan sereal
        </li>
        <li>
          <strong>Protein:</strong> Telur, ikan, ayam, daging tanpa lemak, tempe, tahu, dan kacang-kacangan
        </li>
        <li>
          <strong>Sayuran:</strong> Bayam, wortel, brokoli, kacang panjang, tomat, dan kangkung
        </li>
        <li>
          <strong>Buah-buahan:</strong> Pisang, apel, pepaya, jeruk, mangga, dan jambu
        </li>
        <li>
          <strong>Susu dan produk susu:</strong> Susu, keju, dan yogurt
        </li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-2">Tips Memberi Makan Anak</h3>
      <ol class="list-decimal pl-5 mb-4">
        <li>Sajikan makanan dalam porsi kecil dan berwarna-warni</li>
        <li>Berikan makanan dengan tekstur yang bervariasi</li>
        <li>Jadikan makanan dalam bentuk yang menarik</li>
        <li>Ajak anak untuk makan bersama keluarga</li>
        <li>Biarkan anak makan sendiri untuk melatih kemandirian</li>
        <li>Hindari memberikan makanan manis dan minuman bersoda</li>
        <li>Batasi makanan cepat saji dan makanan kemasan dengan pengawet</li>
      </ol>
      
      <h3 class="text-lg font-semibold mb-2">Contoh Menu Harian</h3>
      <div class="mb-4">
        <p class="font-medium">Sarapan:</p>
        <ul class="list-disc pl-5 mb-2">
          <li>Bubur ayam dengan sayuran</li>
          <li>Roti gandum dengan telur dan susu</li>
          <li>Sereal dengan susu dan buah</li>
        </ul>
        
        <p class="font-medium">Makan Siang:</p>
        <ul class="list-disc pl-5 mb-2">
          <li>Nasi, ikan/ayam/tempe, sayur, dan buah</li>
          <li>Nasi tim dengan daging, sayur, dan buah</li>
        </ul>
        
        <p class="font-medium">Makan Malam:</p>
        <ul class="list-disc pl-5 mb-2">
          <li>Nasi, telur dadar, sup sayuran, dan buah</li>
          <li>Ubi rebus, ayam panggang, dan sayuran</li>
        </ul>
        
        <p class="font-medium">Camilan:</p>
        <ul class="list-disc pl-5">
          <li>Buah-buahan segar</li>
          <li>Yogurt</li>
          <li>Roti gandum dengan selai kacang</li>
          <li>Susu</li>
        </ul>
      </div>
      
      <p class="italic">Catatan: Sesuaikan porsi dan jenis makanan dengan usia, kebutuhan, dan kondisi kesehatan anak. Konsultasikan dengan tenaga kesehatan jika anak memiliki alergi atau kondisi kesehatan tertentu.</p>
    `,
    published: "8 April 2025"
  },
  {
    id: 3,
    title: "Jadwal Imunisasi Lengkap untuk Anak Indonesia",
    category: "immunization",
    summary: "Imunisasi adalah cara efektif untuk melindungi anak dari berbagai penyakit berbahaya. Pahami jadwal imunisasi yang direkomendasikan untuk anak Indonesia.",
    imageUrl: "https://source.unsplash.com/random/800x600/?vaccine",
    content: `
      <p class="mb-4">Imunisasi adalah cara yang efektif untuk melindungi anak dari berbagai penyakit berbahaya. Program imunisasi dasar di Indonesia merupakan bagian dari upaya pemerintah untuk menurunkan angka kesakitan dan kematian pada anak akibat Penyakit yang Dapat Dicegah Dengan Imunisasi (PD3I).</p>
      
      <h3 class="text-lg font-semibold mb-2">Jadwal Imunisasi Dasar untuk Bayi (0-12 bulan)</h3>
      <table class="w-full mb-4 border-collapse">
        <thead>
          <tr class="bg-semar-green/10">
            <th class="border p-2 text-left">Usia</th>
            <th class="border p-2 text-left">Jenis Imunisasi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">Saat lahir</td>
            <td class="border p-2">Hepatitis B (0-24 jam), BCG, Polio-0</td>
          </tr>
          <tr>
            <td class="border p-2">1 bulan</td>
            <td class="border p-2">Hepatitis B-1</td>
          </tr>
          <tr>
            <td class="border p-2">2 bulan</td>
            <td class="border p-2">DPT-HB-Hib-1, Polio-1, PCV-1</td>
          </tr>
          <tr>
            <td class="border p-2">3 bulan</td>
            <td class="border p-2">DPT-HB-Hib-2, Polio-2</td>
          </tr>
          <tr>
            <td class="border p-2">4 bulan</td>
            <td class="border p-2">DPT-HB-Hib-3, Polio-3, PCV-2</td>
          </tr>
          <tr>
            <td class="border p-2">9 bulan</td>
            <td class="border p-2">Campak/MR, PCV-3</td>
          </tr>
        </tbody>
      </table>
      
      <h3 class="text-lg font-semibold mb-2">Jadwal Imunisasi Lanjutan</h3>
      <table class="w-full mb-4 border-collapse">
        <thead>
          <tr class="bg-semar-green/10">
            <th class="border p-2 text-left">Usia</th>
            <th class="border p-2 text-left">Jenis Imunisasi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">18 bulan</td>
            <td class="border p-2">DPT-HB-Hib booster, Campak/MR, JE (daerah endemis)</td>
          </tr>
          <tr>
            <td class="border p-2">2 tahun</td>
            <td class="border p-2">Booster Polio</td>
          </tr>
          <tr>
            <td class="border p-2">5-6 tahun (SD kelas 1)</td>
            <td class="border p-2">DT, Campak/MR</td>
          </tr>
          <tr>
            <td class="border p-2">10-11 tahun (SD kelas 5-6)</td>
            <td class="border p-2">Td</td>
          </tr>
        </tbody>
      </table>
      
      <h3 class="text-lg font-semibold mb-2">Keterangan Jenis Imunisasi</h3>
      <ul class="list-disc pl-5 mb-4">
        <li><strong>BCG:</strong> Bacillus Calmette-Guerin, untuk mencegah TBC</li>
        <li><strong>DPT-HB-Hib:</strong> Difteri, Pertusis, Tetanus, Hepatitis B, dan Haemophilus influenzae type B</li>
        <li><strong>Polio:</strong> Melindungi dari virus polio yang dapat menyebabkan kelumpuhan</li>
        <li><strong>MR:</strong> Measles (Campak) dan Rubella</li>
        <li><strong>PCV:</strong> Pneumococcal Conjugate Vaccine, untuk mencegah pneumonia</li>
        <li><strong>JE:</strong> Japanese Encephalitis, diberikan di daerah endemis</li>
        <li><strong>DT:</strong> Difteri dan Tetanus</li>
        <li><strong>Td:</strong> Tetanus dan difteri (dosis kecil)</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-2">Tips untuk Imunisasi</h3>
      <ol class="list-decimal pl-5 mb-4">
        <li>Bawa buku catatan imunisasi (KIA/Buku KMS) setiap kali kunjungan</li>
        <li>Jangan menunda jadwal imunisasi yang telah ditentukan</li>
        <li>Beritahu petugas kesehatan jika anak sedang sakit</li>
        <li>Jangan khawatir jika anak mengalami demam ringan setelah imunisasi, ini merupakan reaksi normal</li>
        <li>Kompres bagian yang disuntik dengan air hangat jika terjadi pembengkakan</li>
        <li>Berikan ASI lebih sering untuk bayi setelah imunisasi</li>
      </ol>
      
      <p class="italic">Catatan: Jadwal di atas merupakan jadwal standar Program Imunisasi Nasional di Indonesia. Konsultasikan dengan dokter untuk imunisasi tambahan yang direkomendasikan sesuai kebutuhan dan kondisi anak.</p>
    `,
    published: "5 April 2025"
  },
  {
    id: 4,
    title: "Tahapan Perkembangan Anak dan Cara Stimulasinya",
    category: "development",
    summary: "Stimulasi yang tepat sesuai usia dapat mendukung perkembangan motorik, bahasa, kognitif, dan sosial-emosional anak. Pelajari tahapan perkembangan dan cara stimulasi yang tepat.",
    imageUrl: "https://source.unsplash.com/random/800x600/?children,play",
    content: `
      <p class="mb-4">Stimulasi yang tepat sesuai usia anak sangat penting untuk mendukung perkembangan motorik, bahasa, kognitif, dan sosial-emosional. Berikut adalah tahapan perkembangan anak dan cara stimulasi yang sesuai:</p>
      
      <h3 class="text-lg font-semibold mb-2">0-3 Bulan</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p class="font-medium">Tahapan Perkembangan:</p>
          <ul class="list-disc pl-5">
            <li>Mengangkat kepala ketika tengkurap</li>
            <li>Mengikuti gerakan objek dengan mata</li>
            <li>Tersenyum dan merespons suara</li>
            <li>Mengeluarkan suara (seperti "aah", "ooh")</li>
          </ul>
        </div>
        <div>
          <p class="font-medium">Cara Stimulasi:</p>
          <ul class="list-disc pl-5">
            <li>Berikan waktu tengkurap dengan pengawasan</li>
            <li>Ajak bicara dan nyanyikan lagu dengan lembut</li>
            <li>Tunjukkan mainan berwarna cerah</li>
            <li>Berikan sentuhan lembut dan pijatan bayi</li>
          </ul>
        </div>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">4-6 Bulan</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p class="font-medium">Tahapan Perkembangan:</p>
          <ul class="list-disc pl-5">
            <li>Mulai berguling</li>
            <li>Meraih dan menggenggam mainan</li>
            <li>Tertawa dan mengoceh</li>
            <li>Mengenali wajah orang terdekat</li>
          </ul>
        </div>
        <div>
          <p class="font-medium">Cara Stimulasi:</p>
          <ul class="list-disc pl-5">
            <li>Berikan mainan yang aman untuk digenggam</li>
            <li>Tempatkan mainan dalam jangkauan untuk diambil</li>
            <li>Ajak bermain cilukba</li>
            <li>Perkenalkan tekstur berbeda untuk disentuh</li>
          </ul>
        </div>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">7-9 Bulan</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p class="font-medium">Tahapan Perkembangan:</p>
          <ul class="list-disc pl-5">
            <li>Duduk tanpa bantuan</li>
            <li>Merangkak</li>
            <li>Mengucapkan "mama", "papa" (belum spesifik)</li>
            <li>Mencari mainan yang disembunyikan</li>
          </ul>
        </div>
        <div>
          <p class="font-medium">Cara Stimulasi:</p>
          <ul class="list-disc pl-5">
            <li>Berikan mainan yang mengeluarkan suara</li>
            <li>Ajarkan tepuk tangan</li>
            <li>Sembunyikan mainan di bawah kain</li>
            <li>Buat area yang aman untuk merangkak</li>
          </ul>
        </div>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">10-12 Bulan</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p class="font-medium">Tahapan Perkembangan:</p>
          <ul class="list-disc pl-5">
            <li>Berdiri dengan bantuan</li>
            <li>Berjalan dengan berpegangan</li>
            <li>Mengucapkan 2-3 kata bermakna</li>
            <li>Menunjuk benda yang diinginkan</li>
          </ul>
        </div>
        <div>
          <p class="font-medium">Cara Stimulasi:</p>
          <ul class="list-disc pl-5">
            <li>Bantu berjalan dengan memegang tangan</li>
            <li>Bacakan buku bergambar</li>
            <li>Kenalkan nama-nama benda</li>
            <li>Ajari melambaikan tangan dan tepuk tangan</li>
          </ul>
        </div>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">1-2 Tahun</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p class="font-medium">Tahapan Perkembangan:</p>
          <ul class="list-disc pl-5">
            <li>Berjalan mandiri</li>
            <li>Menyusun 2-3 balok</li>
            <li>Mencoret-coret</li>
            <li>Memahami perintah sederhana</li>
            <li>Mengenal 10-20 kata</li>
          </ul>
        </div>
        <div>
          <p class="font-medium">Cara Stimulasi:</p>
          <ul class="list-disc pl-5">
            <li>Berikan alat gambar seperti krayon besar</li>
            <li>Sediakan balok-balok untuk disusun</li>
            <li>Bacakan buku cerita sederhana</li>
            <li>Ajak bermain lempar bola</li>
            <li>Ajarkan bagian-bagian tubuh</li>
          </ul>
        </div>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">2-3 Tahun</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p class="font-medium">Tahapan Perkembangan:</p>
          <ul class="list-disc pl-5">
            <li>Berlari dan melompat</li>
            <li>Menaiki tangga</li>
            <li>Berbicara dengan kalimat 2-3 kata</li>
            <li>Mengenali warna dasar</li>
            <li>Mulai bermain peran sederhana</li>
          </ul>
        </div>
        <div>
          <p class="font-medium">Cara Stimulasi:</p>
          <ul class="list-disc pl-5">
            <li>Bermain kejar-kejaran</li>
            <li>Sediakan mainan mendorong dan menarik</li>
            <li>Ajak menyanyikan lagu sederhana</li>
            <li>Kenalkan warna dan bentuk dasar</li>
            <li>Bermain peran seperti berpura-pura memasak</li>
          </ul>
        </div>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">3-5 Tahun</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p class="font-medium">Tahapan Perkembangan:</p>
          <ul class="list-disc pl-5">
            <li>Berdiri dengan satu kaki</li>
            <li>Menggambar bentuk dasar</li>
            <li>Bercerita dengan kalimat lengkap</li>
            <li>Bermain dengan teman sebaya</li>
            <li>Mengenal huruf dan angka</li>
          </ul>
        </div>
        <div>
          <p class="font-medium">Cara Stimulasi:</p>
          <ul class="list-disc pl-5">
            <li>Ajak bermain permainan fisik seperti menangkap bola</li>
            <li>Sediakan alat gambar dan gunting (dengan pengawasan)</li>
            <li>Bacakan buku dan minta anak menceritakan kembali</li>
            <li>Kenalkan huruf dan angka melalui permainan</li>
            <li>Dorong bermain dengan teman sebaya</li>
          </ul>
        </div>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Prinsip Dasar Stimulasi</h3>
      <ol class="list-decimal pl-5 mb-4">
        <li>Stimulasi dilakukan dengan penuh kasih sayang dan kegembiraan</li>
        <li>Sesuaikan stimulasi dengan usia dan tahap perkembangan anak</li>
        <li>Lakukan stimulasi secara bertahap dan berkesinambungan</li>
        <li>Stimulasi diberikan dengan menggunakan benda-benda yang aman</li>
        <li>Berikan pujian atas keberhasilan anak</li>
        <li>Jika anak belum berhasil, terus beri motivasi dan bantu</li>
      </ol>
      
      <p class="italic">Catatan: Setiap anak memiliki kecepatan perkembangan yang berbeda. Jika ada kekhawatiran tentang perkembangan anak, segera konsultasikan dengan tenaga kesehatan.</p>
    `,
    published: "2 April 2025"
  },
  {
    id: 5,
    title: "Mengenali dan Menangani Tanda Penyakit Umum pada Anak",
    category: "disease",
    summary: "Sebagai orang tua, mengenali tanda-tanda penyakit umum pada anak dan mengetahui cara penanganannya sangat penting. Pelajari gejala dan penanganan penyakit umum pada anak.",
    imageUrl: "https://source.unsplash.com/random/800x600/?sick,child",
    content: `
      <p class="mb-4">Sebagai orang tua, mengenali tanda-tanda penyakit umum pada anak dan mengetahui cara penanganannya sangat penting. Berikut adalah beberapa penyakit umum pada anak, gejala, dan cara penanganannya:</p>
      
      <h3 class="text-lg font-semibold mb-2">Demam</h3>
      <div class="mb-4">
        <p class="font-medium">Gejala:</p>
        <ul class="list-disc pl-5 mb-2">
          <li>Suhu tubuh di atas 37,5°C (diukur dari ketiak)</li>
          <li>Anak terasa hangat saat disentuh</li>
          <li>Wajah memerah, berkeringat</li>
          <li>Anak dapat merasa gelisah, lemas, atau mengantuk</li>
        </ul>
        
        <p class="font-medium">Penanganan:</p>
        <ul class="list-disc pl-5">
          <li>Berikan banyak cairan untuk mencegah dehidrasi</li>
          <li>Kenakan pakaian tipis dan jaga ruangan tidak terlalu panas</li>
          <li>Kompres hangat pada dahi, ketiak, dan lipatan paha</li>
          <li>Berikan obat penurun panas sesuai dosis yang dianjurkan oleh dokter</li>
          <li>Segera ke dokter jika demam sangat tinggi (>39°C), demam pada bayi <3 bulan, disertai ruam, leher kaku, atau anak sangat lemas</li>
        </ul>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Diare</h3>
      <div class="mb-4">
        <p class="font-medium">Gejala:</p>
        <ul class="list-disc pl-5 mb-2">
          <li>BAB cair lebih dari 3 kali sehari</li>
          <li>Dapat disertai mual dan muntah</li>
          <li>Nyeri perut</li>
          <li>Tanda dehidrasi: mulut kering, jarang BAK, mata cekung</li>
        </ul>
        
        <p class="font-medium">Penanganan:</p>
        <ul class="list-disc pl-5">
          <li>Berikan oralit untuk mengganti cairan dan elektrolit yang hilang</li>
          <li>Teruskan pemberian ASI pada bayi</li>
          <li>Berikan makanan yang mudah dicerna seperti bubur, pisang</li>
          <li>Hindari makanan berminyak, pedas, dan minuman manis</li>
          <li>Segera ke dokter jika ada tanda dehidrasi berat, diare berdarah, atau diare terus menerus >24 jam</li>
        </ul>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Batuk dan Pilek</h3>
      <div class="mb-4">
        <p class="font-medium">Gejala:</p>
        <ul class="list-disc pl-5 mb-2">
          <li>Hidung tersumbat atau berair</li>
          <li>Batuk</li>
          <li>Bersin-bersin</li>
          <li>Dapat disertai demam ringan</li>
          <li>Nafsu makan menurun</li>
        </ul>
        
        <p class="font-medium">Penanganan:</p>
        <ul class="list-disc pl-5">
          <li>Berikan banyak cairan hangat</li>
          <li>Bersihkan hidung dengan tisu lembut atau aspirator bayi</li>
          <li>Gunakan humidifier atau uap air hangat untuk melegakan pernapasan</li>
          <li>Posisikan kepala anak lebih tinggi saat tidur</li>
          <li>Segera ke dokter jika batuk sangat parah, kesulitan bernapas, atau gejala tidak membaik setelah 3-5 hari</li>
        </ul>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Flu</h3>
      <div class="mb-4">
        <p class="font-medium">Gejala:</p>
        <ul class="list-disc pl-5 mb-2">
          <li>Demam tinggi mendadak</li>
          <li>Sakit kepala</li>
          <li>Batuk kering</li>
          <li>Nyeri otot dan sendi</li>
          <li>Kelelahan yang ekstrem</li>
        </ul>
        
        <p class="font-medium">Penanganan:</p>
        <ul class="list-disc pl-5">
          <li>Istirahat yang cukup</li>
          <li>Berikan banyak cairan</li>
          <li>Berikan obat penurun panas jika demam (sesuai dosis dokter)</li>
          <li>Berikan makanan bergizi meski dalam porsi kecil</li>
          <li>Segera ke dokter jika demam sangat tinggi, sesak napas, atau tidak mau minum</li>
        </ul>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Ruam Kulit / Biang Keringat</h3>
      <div class="mb-4">
        <p class="font-medium">Gejala:</p>
        <ul class="list-disc pl-5 mb-2">
          <li>Ruam merah kecil-kecil</li>
          <li>Gatal</li>
          <li>Muncul di daerah lipatan kulit atau bagian yang tertutup</li>
        </ul>
        
        <p class="font-medium">Penanganan:</p>
        <ul class="list-disc pl-5">
          <li>Jaga agar kulit tetap kering dan sejuk</li>
          <li>Kenakan pakaian yang menyerap keringat dan longgar</li>
          <li>Mandikan anak dengan air hangat</li>
          <li>Keringkan kulit dengan tepuk lembut, hindari menggosok</li>
          <li>Segera ke dokter jika ruam bertambah parah, terinfeksi, atau disertai demam</li>
        </ul>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Cacingan</h3>
      <div class="mb-4">
        <p class="font-medium">Gejala:</p>
        <ul class="list-disc pl-5 mb-2">
          <li>Gatal di sekitar anus, terutama malam hari</li>
          <li>Terdapat cacing di feses</li>
          <li>Nafsu makan berubah (bisa meningkat atau menurun)</li>
          <li>Berat badan sulit naik</li>
          <li>Lesu, pucat</li>
        </ul>
        
        <p class="font-medium">Penanganan:</p>
        <ul class="list-disc pl-5">
          <li>Berikan obat cacing sesuai anjuran dokter</li>
          <li>Jaga kebersihan kuku dan tangan anak</li>
          <li>Biasakan cuci tangan sebelum makan dan setelah BAB</li>
          <li>Cuci bersih makanan mentah sebelum dikonsumsi</li>
          <li>Jaga kebersihan lingkungan dan toilet</li>
        </ul>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Kapan Harus Segera ke Dokter</h3>
      <ul class="list-disc pl-5 mb-4">
        <li>Demam tinggi (>39°C) yang tidak turun dengan obat penurun panas</li>
        <li>Demam pada bayi berusia kurang dari 3 bulan</li>
        <li>Kesulitan bernapas atau napas cepat</li>
        <li>Tidak mau minum atau menyusu sama sekali</li>
        <li>Muntah terus menerus atau muntah menyembur</li>
        <li>Diare berdarah atau diare yang tidak membaik setelah 24 jam</li>
        <li>Tanda dehidrasi berat (sangat lemas, mata cekung, kulit kering)</li>
        <li>Ruam yang menyebar cepat atau disertai demam</li>
        <li>Sakit kepala hebat disertai kaku leher</li>
        <li>Kejang-kejang</li>
        <li>Anak terlihat sangat lemas, pucat, dan tidak responsif</li>
      </ul>
      
      <p class="italic">Catatan: Informasi ini bersifat umum dan tidak menggantikan saran medis profesional. Selalu konsultasikan dengan dokter atau tenaga kesehatan untuk diagnosis dan pengobatan yang tepat.</p>
    `,
    published: "1 April 2025"
  },
  {
    id: 6,
    title: "Pentingnya Kebersihan dan Sanitasi untuk Mencegah Stunting",
    category: "hygiene",
    summary: "Kebersihan dan sanitasi yang baik memiliki peran penting dalam mencegah diare dan infeksi yang dapat menyebabkan stunting. Pelajari cara menjaga kebersihan dan sanitasi yang baik di rumah.",
    imageUrl: "https://source.unsplash.com/random/800x600/?clean,water",
    content: `
      <p class="mb-4">Kebersihan dan sanitasi yang baik memiliki peran penting dalam mencegah diare dan infeksi yang dapat menyebabkan stunting. Diare dan infeksi berulang dapat mengganggu penyerapan nutrisi dan pada akhirnya berdampak pada pertumbuhan anak. Berikut adalah panduan untuk menjaga kebersihan dan sanitasi yang baik di rumah:</p>
      
      <h3 class="text-lg font-semibold mb-2">Kebersihan Tangan</h3>
      <div class="mb-4">
        <p class="mb-2">Mencuci tangan adalah salah satu cara paling efektif untuk mencegah penyebaran kuman. Ajarkan anak untuk mencuci tangan dengan sabun dan air mengalir pada 5 waktu penting:</p>
        <ol class="list-decimal pl-5">
          <li>Sebelum makan</li>
          <li>Setelah buang air besar/kecil</li>
          <li>Sebelum menyiapkan makanan</li>
          <li>Setelah memegang hewan</li>
          <li>Setelah bermain di luar rumah</li>
        </ol>
        
        <p class="mt-2 font-medium">Cara Mencuci Tangan yang Benar:</p>
        <ol class="list-decimal pl-5">
          <li>Basahi tangan dengan air mengalir</li>
          <li>Gunakan sabun dan gosok seluruh permukaan tangan, termasuk sela-sela jari</li>
          <li>Gosok tangan minimal 20 detik</li>
          <li>Bilas dengan air mengalir</li>
          <li>Keringkan dengan handuk bersih atau tissue</li>
        </ol>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Air Minum yang Aman</h3>
      <div class="mb-4">
        <p class="mb-2">Air yang tidak bersih dapat menjadi sumber penyakit seperti diare, tipus, dan kolera. Pastikan keluarga Anda mendapatkan air minum yang aman:</p>
        <ul class="list-disc pl-5">
          <li>Rebus air hingga mendidih dan biarkan mendidih selama minimal 1 menit</li>
          <li>Simpan air yang sudah direbus dalam wadah tertutup</li>
          <li>Gunakan air bersih untuk mencuci buah dan sayuran</li>
          <li>Gunakan air yang sudah dimasak untuk membuat minuman atau MPASI anak</li>
        </ul>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Kebersihan Makanan</h3>
      <div class="mb-4">
        <p class="mb-2">Makanan yang tidak bersih dapat menjadi sumber infeksi bakteri dan parasit:</p>
        <ul class="list-disc pl-5">
          <li>Cuci tangan sebelum menyiapkan dan menyajikan makanan</li>
          <li>Cuci semua bahan makanan dengan air bersih</li>
          <li>Masak makanan hingga benar-benar matang</li>
          <li>Hindari menyimpan makanan matang terlalu lama pada suhu ruangan</li>
          <li>Gunakan alat makan yang bersih</li>
          <li>Pisahkan penyimpanan dan pengolahan daging mentah dari makanan lain</li>
        </ul>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Sanitasi Toilet dan Pembuangan Limbah</h3>
      <div class="mb-4">
        <p class="mb-2">Sanitasi yang buruk dapat menyebabkan penyebaran penyakit melalui tinja:</p>
        <ul class="list-disc pl-5">
          <li>Gunakan toilet atau jamban yang bersih</li>
          <li>Jangan buang air besar sembarangan</li>
          <li>Bersihkan toilet secara teratur dengan disinfektan</li>
          <li>Buang tinja bayi dan anak ke dalam toilet</li>
          <li>Ajarkan anak untuk menggunakan toilet dengan benar</li>
          <li>Buang sampah pada tempatnya dan kelola pemisahan sampah</li>
        </ul>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Lingkungan Rumah yang Bersih</h3>
      <div class="mb-4">
        <p class="mb-2">Lingkungan rumah yang bersih dapat mencegah penyakit dan infeksi:</p>
        <ul class="list-disc pl-5">
          <li>Bersihkan lantai secara teratur</li>
          <li>Pastikan ventilasi rumah baik</li>
          <li>Cuci peralatan tidur dan mainan anak secara berkala</li>
          <li>Hindari genangan air yang bisa menjadi tempat berkembang biak nyamuk</li>
          <li>Kelola sampah dengan baik dan buang sampah secara teratur</li>
        </ul>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Kebersihan Anak</h3>
      <div class="mb-4">
        <p class="mb-2">Menjaga kebersihan anak dapat mencegah infeksi dan penyakit:</p>
        <ul class="list-disc pl-5">
          <li>Mandikan anak secara teratur, minimal 2 kali sehari</li>
          <li>Ganti popok segera setelah basah atau kotor</li>
          <li>Bersihkan area popok dengan benar dari depan ke belakang</li>
          <li>Jaga kebersihan kuku dengan memotongnya secara teratur</li>
          <li>Cuci rambut anak minimal 2-3 kali seminggu</li>
        </ul>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Mencegah Infeksi Cacingan</h3>
      <div class="mb-4">
        <p class="mb-2">Infeksi cacingan dapat menyebabkan malnutrisi dan mengganggu pertumbuhan:</p>
        <ul class="list-disc pl-5">
          <li>Berikan obat cacing secara rutin setiap 6 bulan (sesuai anjuran dokter)</li>
          <li>Pakai alas kaki saat beraktivitas di luar rumah</li>
          <li>Hindari anak bermain di tanah yang terkontaminasi</li>
          <li>Cuci tangan setelah bersentuhan dengan tanah</li>
          <li>Masak daging dan ikan hingga benar-benar matang</li>
        </ul>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">Hubungan Sanitasi dengan Stunting</h3>
      <p class="mb-4">Menurut penelitian, anak-anak yang tinggal di lingkungan dengan sanitasi buruk memiliki risiko stunting 1,5 kali lebih tinggi dibandingkan anak yang tinggal di lingkungan dengan sanitasi baik. Hal ini disebabkan:</p>
      <ul class="list-disc pl-5 mb-4">
        <li>Diare berulang menyebabkan kehilangan nutrisi dan mengganggu penyerapan</li>
        <li>Infeksi cacingan mengambil nutrisi yang seharusnya untuk pertumbuhan anak</li>
        <li>Lingkungan yang kotor meningkatkan paparan terhadap patogen</li>
        <li>Energi tubuh dialihkan untuk melawan infeksi, bukan untuk pertumbuhan</li>
      </ul>
      
      <p class="italic">Catatan: Kebersihan dan sanitasi yang baik harus diimbangi dengan pemberian makanan bergizi dan pengasuhan yang tepat untuk mencegah stunting secara optimal.</p>
    `,
    published: "30 Maret 2025"
  }
];

const ChildHealth = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<(typeof ARTICLES)[0] | null>(null);
  
  // Filter articles based on search term and category
  const filteredArticles = ARTICLES.filter(article => {
    const matchesSearch = searchTerm === "" || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Layout>
      <div className="bg-gradient-to-b from-semar-green/10 to-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Informasi Kesehatan Anak
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Pelajari berbagai informasi penting tentang kesehatan dan perkembangan anak.
            </p>
          </div>
          
          {selectedArticle ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-semar-green text-white rounded-full mb-2">
                      {CATEGORIES.find(c => c.id === selectedArticle.category)?.name || selectedArticle.category}
                    </span>
                    <h2 className="text-2xl font-bold text-white">{selectedArticle.title}</h2>
                    <p className="text-sm text-white/80 mt-1">Dipublikasikan: {selectedArticle.published}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div 
                  className="prose max-w-none" 
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />
                
                <div className="mt-8 border-t pt-6">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-4 py-2 bg-semar-green text-white rounded-md hover:bg-semar-green/90"
                  >
                    Kembali ke Daftar Artikel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari artikel..."
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-semar-green focus:ring-semar-green"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-auto rounded-md border-gray-300 shadow-sm focus:border-semar-green focus:ring-semar-green"
                  >
                    <option value="">Semua Kategori</option>
                    {CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="relative h-48">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 p-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-semar-green text-white rounded-full">
                          {CATEGORIES.find(c => c.id === article.category)?.name || article.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-semar-green">
                          <Info className="h-4 w-4 mr-1" />
                          Baca Selengkapnya
                        </span>
                        <span className="text-gray-500 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {article.published}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {filteredArticles.length === 0 && (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">Tidak ada artikel yang ditemukan.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChildHealth;
