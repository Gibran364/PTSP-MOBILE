import { db, firebaseAuth, serverTimestamp } from '@/lib/firebase';

type CompanyData = {
  No_Identitas: string;
  Nama_Lengkap: string;
  Jenis_Kelamin: string;
  Pekerjaan: string;
  Pendidikan_Terakhir: string;
  No_Hp: string;
  NPWP_Perusahaan: string;
  Nama_Perusahaan: string;
  Alamat_Perusahaan: string;
  Provinsi_Perusahaan: string;
  Kabupaten_Kota_Perusahaan: string;
  Email_Perusahaan: string;
  No_Hp_Perusahaan: string;
};

export const useCompanyRegister = () => {
  const register = async (data: CompanyData) => {
    try {
      const user = firebaseAuth.currentUser;
      if (!user) throw new Error('User belum login');

      const now = serverTimestamp();

      await db
        .collection('perusahaan')
        .doc(user.uid)
        .set({
          Email: user.email,
          ...data,
          Tanggal_Pembuatan_Akun: now,
        });

      console.log('✅ Registrasi perusahaan berhasil disimpan ke Firestore');
    } catch (error) {
      console.error('❌ Gagal menyimpan registrasi:', error);
      throw error;
    }
  };

  const fetchCurrentUserData = async () => {
    try {
      const user = firebaseAuth.currentUser;
      if (!user) throw new Error('User belum login');

      const doc = await db.collection('perusahaan').doc(user.uid).get();

      if (!doc.exists) {
        console.log('📭 Data tidak ditemukan');
        return null;
      }

      const data = doc.data();
      console.log('📦 Data User Terkini:', data);
      return data;
    } catch (error) {
      console.error('❌ Gagal mengambil data perusahaan terkini:', error);
      throw error;
    }
  };

  return { register, fetchCurrentUserData };
};
