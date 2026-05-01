# TalentFinder - Sistem Rekomendasi Talenta

## Persiapan

Pastikan sudah terinstall:
- Node.js (v18+)
- MongoDB (lokal atau Atlas)
- Python (3.8+)
- Git

## 1. Clone Repository

```bash
git clone https://github.com/PrinceRuli/talent-recommendation-system.git
cd talent-recommendation-system
2. Backend (Node.js)
bash
cd backend
npm install
Buat file .env di folder backend dengan isi:

text
MONGO_URI=mongodb+srv://...  # atau mongodb://localhost:27017/talentdb
JWT_SECRET=rahasia123
PORT=5000
Jalankan server:

bash
npm run dev
Server berjalan di http://localhost:5000

3. Frontend (React)
bash
cd ../frontend
npm install
npm start
Aplikasi berjalan di http://localhost:3000

4. Machine Learning Service (Flask)
bash
cd ../ml-service
python -m venv venv
source venv/bin/activate  # Linux/Mac
# atau
venv\Scripts\activate     # Windows

pip install -r requirements.txt
Jika file requirements.txt belum ada, buat dengan perintah pip freeze > requirements.txt setelah install semua package.

Latih model (jika belum ada model):

bash
python train_model.py
Jalankan API:

bash
python app.py
ML service berjalan di http://localhost:5001

5. Cara Penggunaan
Buka http://localhost:3000

Daftar akun baru atau login

Ikuti tes minat (24 pertanyaan)

Setelah selesai, hasil rekomendasi talenta akan ditampilkan

Login Admin
Gunakan akun dengan role admin (ubah manual di database atau buat user dengan field role "admin")

Akses panel admin di http://localhost:3000/admin

Catatan
Pastikan ketiga service (backend, frontend, ML) berjalan bersamaan.

Jika ada error pada ML service, pastikan model talent_model.pkl sudah ada (jalankan train_model.py terlebih dahulu).
