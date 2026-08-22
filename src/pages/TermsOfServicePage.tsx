import React from 'react';
import { FileCheck, Mail } from 'lucide-react';
import { Language } from '../data/translations';

interface TermsOfServicePageProps {
  language?: Language;
}

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <div id={id} className="scroll-mt-24 py-6 border-b border-slate-200 last:border-b-0">
    <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900 mb-3">{title}</h2>
    <div className="text-sm text-slate-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ language = 'id' }) => {
  const isId = language === 'id';

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <section className="relative bg-white text-slate-900 py-14 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs font-mono">
            <FileCheck className="w-3.5 h-3.5" />
            <span>{isId ? 'Ketentuan Layanan' : 'Terms of Service'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
            {isId ? 'Ketentuan Layanan NusaSec' : 'NusaSec Terms of Service'}
          </h1>
          <p className="text-sm text-slate-500 font-mono">
            {isId ? 'Terakhir diperbarui: 22 Agustus 2026' : 'Last updated: August 22, 2026'}
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {isId
              ? 'Ketentuan ini mengatur akses dan penggunaan Anda atas platform, situs, dan layanan NusaSec ("Layanan"). Dengan membuat akun atau menggunakan Layanan, Anda menyetujui ketentuan berikut.'
              : 'These terms govern your access to and use of the NusaSec platform, website, and services (the "Services"). By creating an account or using the Services, you agree to the following terms.'}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-2xl border border-slate-200 px-6 sm:px-8">

          <Section id="acceptance" title={isId ? '1. Penerimaan Ketentuan' : '1. Acceptance of Terms'}>
            <p>
              {isId
                ? 'Dengan mendaftar, mengakses, atau menggunakan Layanan, Anda menyatakan memiliki wewenang untuk mengikat entitas yang Anda wakili pada ketentuan ini. Jika Anda tidak setuju, Anda tidak boleh menggunakan Layanan.'
                : 'By registering for, accessing, or using the Services, you represent that you have the authority to bind the entity you represent to these terms. If you do not agree, you may not use the Services.'}
            </p>
          </Section>

          <Section id="description" title={isId ? '2. Deskripsi Layanan' : '2. Description of Services'}>
            <p>
              {isId
                ? 'NusaSec menyediakan platform keamanan multi-cloud yang mencakup manajemen postur keamanan cloud (CSPM), pemetaan graf ancaman, kesiapan kriptografi pasca-kuantum, dan otomasi kepatuhan regulasi. Fitur spesifik bergantung pada paket berlangganan yang Anda pilih.'
                : 'NusaSec provides a multi-cloud security platform covering cloud security posture management (CSPM), threat graph mapping, post-quantum cryptography readiness, and regulatory compliance automation. Specific features depend on your chosen subscription tier.'}
            </p>
          </Section>

          <Section id="accounts" title={isId ? '3. Akun & Tanggung Jawab Pengguna' : '3. Accounts & User Responsibilities'}>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>{isId ? 'Anda bertanggung jawab menjaga kerahasiaan kredensial akun dan segala aktivitas di bawah akun Anda.' : 'You are responsible for safeguarding your account credentials and all activity under your account.'}</li>
              <li>{isId ? 'Anda wajib memberikan informasi akurat saat pendaftaran dan memperbaruinya bila terjadi perubahan.' : 'You must provide accurate information at registration and keep it up to date.'}</li>
              <li>{isId ? 'Anda hanya boleh menghubungkan akun cloud (AWS/GCP/Azure) yang Anda memiliki wewenang sah untuk memindainya.' : 'You may only connect cloud accounts (AWS/GCP/Azure) that you are legally authorized to scan.'}</li>
            </ul>
          </Section>

          <Section id="prohibited" title={isId ? '4. Penggunaan yang Dilarang' : '4. Prohibited Uses'}>
            <p>{isId ? 'Anda dilarang menggunakan Layanan untuk:' : 'You may not use the Services to:'}</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>{isId ? 'Memindai atau menyerang sistem tanpa izin sah dari pemiliknya.' : 'Scan or attack systems without lawful authorization from their owner.'}</li>
              <li>{isId ? 'Merekayasa balik, mendekompilasi, atau mencoba mengekstrak kode sumber platform.' : 'Reverse-engineer, decompile, or attempt to extract the platform\'s source code.'}</li>
              <li>{isId ? 'Mengganggu integritas atau kinerja infrastruktur NusaSec (mis. melalui denial-of-service).' : 'Interfere with the integrity or performance of NusaSec infrastructure (e.g. via denial-of-service).'}</li>
              <li>{isId ? 'Melanggar hukum yang berlaku, termasuk UU ITE dan UU PDP.' : 'Violate applicable law, including Indonesia\'s Electronic Information and Transactions Law and Personal Data Protection Law.'}</li>
            </ul>
          </Section>

          <Section id="ip" title={isId ? '5. Kekayaan Intelektual' : '5. Intellectual Property'}>
            <p>
              {isId
                ? 'NusaSec dan pemberi lisensinya memiliki seluruh hak, kepemilikan, dan kepentingan atas platform, termasuk namun tidak terbatas pada kode, algoritma deteksi, dan desain antarmuka. Ketentuan ini tidak memberikan Anda hak apa pun atas kekayaan intelektual tersebut selain lisensi terbatas untuk menggunakan Layanan sesuai paket berlangganan Anda.'
                : 'NusaSec and its licensors retain all right, title, and interest in the platform, including but not limited to code, detection algorithms, and interface design. These terms grant you no rights to that intellectual property beyond a limited license to use the Services under your subscription tier.'}
            </p>
          </Section>

          <Section id="liability" title={isId ? '6. Batasan Tanggung Jawab' : '6. Limitation of Liability'}>
            <p>
              {isId
                ? 'Sepanjang diizinkan hukum, NusaSec tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan Layanan. Tanggung jawab total kami atas klaim apa pun terbatas pada jumlah yang Anda bayarkan kepada kami dalam 12 bulan terakhir.'
                : 'To the extent permitted by law, NusaSec is not liable for indirect, incidental, or consequential damages arising from use of the Services. Our total liability for any claim is limited to the amount you paid us in the preceding 12 months.'}
            </p>
          </Section>

          <Section id="sla" title={isId ? '7. SLA & Ketersediaan Layanan' : '7. SLA & Service Availability'}>
            <p>
              {isId
                ? 'Kami menargetkan ketersediaan layanan 99.99% untuk paket Enterprise dan Sovereign, sebagaimana dirinci dalam Perjanjian Tingkat Layanan (SLA) terpisah. Status operasional real-time tersedia di halaman Keamanan & Kepercayaan kami.'
                : 'We target 99.99% service availability for Enterprise and Sovereign tiers, as detailed in a separate Service Level Agreement (SLA). Real-time operational status is available on our Security & Trust page.'}
            </p>
          </Section>

          <Section id="termination" title={isId ? '8. Penghentian Layanan' : '8. Termination'}>
            <p>
              {isId
                ? 'Kami dapat menangguhkan atau menghentikan akses Anda jika terjadi pelanggaran material terhadap ketentuan ini. Anda dapat menghentikan langganan kapan pun sesuai ketentuan pembayaran pada paket Anda; data Anda dapat diunduh dalam masa tenggang 30 hari setelah penghentian.'
                : 'We may suspend or terminate your access for material breach of these terms. You may cancel your subscription at any time subject to your plan\'s billing terms; your data can be exported during a 30-day grace period after termination.'}
            </p>
          </Section>

          <Section id="law" title={isId ? '9. Hukum yang Berlaku' : '9. Governing Law'}>
            <p>
              {isId
                ? 'Ketentuan ini diatur oleh dan ditafsirkan sesuai hukum Republik Indonesia. Sengketa yang tidak dapat diselesaikan secara musyawarah akan diselesaikan melalui pengadilan yang berwenang di Mataram, Nusa Tenggara Barat, atau forum lain yang disepakati para pihak secara tertulis.'
                : 'These terms are governed by and construed in accordance with the laws of the Republic of Indonesia. Disputes not resolved amicably will be settled in the competent courts of Mataram, West Nusa Tenggara, or another forum agreed in writing by the parties.'}
            </p>
          </Section>

          <Section id="changes" title={isId ? '10. Perubahan Ketentuan' : '10. Changes to These Terms'}>
            <p>
              {isId
                ? 'Kami dapat mengubah ketentuan ini dari waktu ke waktu. Perubahan material akan diberitahukan minimal 30 hari sebelumnya melalui email atau notifikasi platform.'
                : 'We may modify these terms from time to time. Material changes will be notified at least 30 days in advance via email or an in-platform notice.'}
            </p>
          </Section>

          <Section id="contact" title={isId ? '11. Hubungi Kami' : '11. Contact Us'}>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              {isId ? 'Pertanyaan mengenai ketentuan ini dapat diarahkan ke ' : 'Questions about these terms can be directed to '}
              <a href="mailto:legal@nusasec.com" className="text-blue-600 font-semibold hover:underline">legal@nusasec.com</a>
            </p>
          </Section>

        </div>
      </div>
    </div>
  );
};
