import React from 'react';
import { ShieldCheck, Mail } from 'lucide-react';
import { Language } from '../data/translations';

interface PrivacyPolicyPageProps {
  language?: Language;
}

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <div id={id} className="scroll-mt-24 py-6 border-b border-slate-200 last:border-b-0">
    <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900 mb-3">{title}</h2>
    <div className="text-sm text-slate-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ language = 'id' }) => {
  const isId = language === 'id';

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <section className="relative bg-white text-slate-900 py-14 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isId ? 'Kebijakan Privasi' : 'Privacy Policy'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
            {isId ? 'Kebijakan Privasi NusaSec' : 'NusaSec Privacy Policy'}
          </h1>
          <p className="text-sm text-slate-500 font-mono">
            {isId ? 'Terakhir diperbarui: 22 Agustus 2026' : 'Last updated: August 22, 2026'}
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {isId
              ? 'Kebijakan ini menjelaskan bagaimana NusaSec mengumpulkan, menggunakan, melindungi, dan membagikan informasi Anda saat menggunakan platform, situs, dan layanan kami, sejalan dengan Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) dan praktik internasional yang relevan (termasuk GDPR bagi pelanggan di Uni Eropa).'
              : 'This policy explains how NusaSec collects, uses, protects, and shares your information when you use our platform, website, and services, in line with Indonesia\'s Personal Data Protection Law (UU PDP) and relevant international frameworks (including GDPR for EU customers).'}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-2xl border border-slate-200 px-6 sm:px-8">

          <Section id="collection" title={isId ? '1. Informasi yang Kami Kumpulkan' : '1. Information We Collect'}>
            <p>
              {isId
                ? 'Kami mengumpulkan informasi yang Anda berikan langsung (nama, email kantor, nama perusahaan, riwayat komunikasi dengan tim kami), data teknis yang dihasilkan secara otomatis saat Anda menggunakan platform (log akses, alamat IP, metadata konfigurasi cloud yang dipindai), serta data yang dihasilkan oleh integrasi yang Anda aktifkan (mis. temuan CSPM, hasil pemindaian kerentanan).'
                : 'We collect information you provide directly (name, work email, company name, communication history with our team), technical data generated automatically as you use the platform (access logs, IP addresses, metadata from scanned cloud configurations), and data produced by integrations you enable (e.g. CSPM findings, vulnerability scan results).'}
            </p>
            <p>
              {isId
                ? 'Kami tidak pernah dengan sengaja mengumpulkan data pribadi sensitif (kesehatan, keyakinan agama, orientasi politik) kecuali data tersebut secara tidak sengaja termuat dalam konfigurasi atau log pelanggan yang dipindai oleh sistem kami untuk tujuan deteksi kerentanan.'
                : 'We do not intentionally collect sensitive personal data (health, religious belief, political affiliation) unless such data is incidentally present in customer configurations or logs scanned by our systems for vulnerability detection purposes.'}
            </p>
          </Section>

          <Section id="use" title={isId ? '2. Bagaimana Kami Menggunakan Informasi' : '2. How We Use Information'}>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>{isId ? 'Menyediakan, memelihara, dan meningkatkan platform keamanan NusaSec.' : 'Providing, maintaining, and improving the NusaSec security platform.'}</li>
              <li>{isId ? 'Mendeteksi, menyelidiki, dan mencegah aktivitas mencurigakan atau pelanggaran keamanan.' : 'Detecting, investigating, and preventing suspicious activity or security incidents.'}</li>
              <li>{isId ? 'Berkomunikasi dengan Anda terkait dukungan teknis, tagihan, dan pembaruan produk.' : 'Communicating with you about technical support, billing, and product updates.'}</li>
              <li>{isId ? 'Memenuhi kewajiban hukum, termasuk pelaporan kepada regulator seperti OJK dan BSSN bila diwajibkan.' : 'Meeting legal obligations, including reporting to regulators such as OJK and BSSN where required.'}</li>
            </ul>
          </Section>

          <Section id="legal-basis" title={isId ? '3. Dasar Hukum Pemrosesan' : '3. Legal Basis for Processing'}>
            <p>
              {isId
                ? 'Kami memproses data pribadi berdasarkan: (a) pelaksanaan kontrak layanan dengan Anda, (b) persetujuan eksplisit yang Anda berikan untuk keperluan tertentu (mis. buletin pemasaran), (c) kepentingan sah kami dalam menjaga keamanan platform, dan (d) kepatuhan terhadap kewajiban hukum yang berlaku di Indonesia dan yurisdiksi lain tempat kami beroperasi.'
                : 'We process personal data based on: (a) performance of our service contract with you, (b) explicit consent you provide for specific purposes (e.g. marketing newsletters), (c) our legitimate interest in maintaining platform security, and (d) compliance with legal obligations applicable in Indonesia and other jurisdictions where we operate.'}
            </p>
          </Section>

          <Section id="sharing" title={isId ? '4. Berbagi Data dengan Pihak Ketiga' : '4. Sharing Data with Third Parties'}>
            <p>
              {isId
                ? 'Kami tidak menjual data pribadi Anda. Data dapat dibagikan secara terbatas kepada: penyedia infrastruktur cloud yang kami gunakan untuk menghosting layanan, auditor independen dalam rangka sertifikasi SOC 2 / ISO 27001, penegak hukum bila diwajibkan secara sah, dan sub-prosesor yang telah menandatangani perjanjian pemrosesan data (DPA) dengan kami.'
                : 'We do not sell your personal data. Data may be shared on a limited basis with: cloud infrastructure providers we use to host our services, independent auditors for SOC 2 / ISO 27001 certification purposes, law enforcement where legally compelled, and sub-processors who have signed a data processing agreement (DPA) with us.'}
            </p>
          </Section>

          <Section id="security" title={isId ? '5. Keamanan Data' : '5. Data Security'}>
            <p>
              {isId
                ? 'Data dienkripsi saat transit (TLS 1.3, dengan skema hibrida Pasca-Kuantum ML-KEM di jalur tertentu) dan saat disimpan (AES-256). Akses internal ke data pelanggan dibatasi berdasarkan prinsip hak akses minimum (least privilege) dan dicatat dalam audit log yang tidak dapat diubah.'
                : 'Data is encrypted in transit (TLS 1.3, with a hybrid Post-Quantum ML-KEM scheme on select paths) and at rest (AES-256). Internal access to customer data is restricted on a least-privilege basis and recorded in immutable audit logs.'}
            </p>
          </Section>

          <Section id="rights" title={isId ? '6. Hak Anda sebagai Subjek Data' : '6. Your Rights as a Data Subject'}>
            <p>
              {isId ? 'Sesuai UU PDP, Anda berhak untuk:' : 'Under UU PDP and comparable frameworks, you have the right to:'}
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>{isId ? 'Mengakses dan meminta salinan data pribadi Anda.' : 'Access and request a copy of your personal data.'}</li>
              <li>{isId ? 'Meminta koreksi data yang tidak akurat.' : 'Request correction of inaccurate data.'}</li>
              <li>{isId ? 'Meminta penghapusan data ("hak untuk dilupakan") sepanjang tidak bertentangan dengan kewajiban hukum kami.' : 'Request deletion of your data ("right to be forgotten"), subject to our legal retention obligations.'}</li>
              <li>{isId ? 'Menarik persetujuan yang sebelumnya diberikan.' : 'Withdraw previously given consent.'}</li>
              <li>{isId ? 'Mengajukan keberatan atas pemrosesan tertentu.' : 'Object to certain types of processing.'}</li>
            </ul>
          </Section>

          <Section id="retention" title={isId ? '7. Retensi Data' : '7. Data Retention'}>
            <p>
              {isId
                ? 'Kami menyimpan data pribadi selama akun Anda aktif, ditambah periode retensi yang wajar untuk keperluan audit, kepatuhan, dan penyelesaian sengketa (umumnya hingga 7 tahun untuk catatan finansial sesuai regulasi Indonesia), kecuali disyaratkan lebih lama oleh hukum yang berlaku.'
                : 'We retain personal data for as long as your account is active, plus a reasonable retention period for audit, compliance, and dispute-resolution purposes (generally up to 7 years for financial records under Indonesian regulation), unless a longer period is required by applicable law.'}
            </p>
          </Section>

          <Section id="transfer" title={isId ? '8. Transfer Data Internasional' : '8. International Data Transfers'}>
            <p>
              {isId
                ? 'Data pelanggan sektor keuangan dan pemerintahan disimpan di enklave kedaulatan data kami di Jakarta. Untuk pelanggan lain, data dapat diproses di region cloud lain (mis. Singapura) dengan perlindungan kontraktual yang setara.'
                : 'Financial-sector and government customer data is stored in our data sovereignty enclave in Jakarta. For other customers, data may be processed in other cloud regions (e.g. Singapore) under equivalent contractual safeguards.'}
            </p>
          </Section>

          <Section id="changes" title={isId ? '9. Perubahan Kebijakan Ini' : '9. Changes to This Policy'}>
            <p>
              {isId
                ? 'Kami dapat memperbarui kebijakan ini dari waktu ke waktu. Perubahan material akan diberitahukan melalui email atau pemberitahuan pada platform sebelum berlaku efektif.'
                : 'We may update this policy from time to time. Material changes will be communicated via email or an in-platform notice before taking effect.'}
            </p>
          </Section>

          <Section id="contact" title={isId ? '10. Hubungi Kami' : '10. Contact Us'}>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              {isId
                ? 'Untuk pertanyaan privasi atau permintaan hak subjek data, hubungi Petugas Perlindungan Data kami di '
                : 'For privacy questions or data subject rights requests, contact our Data Protection Officer at '}
              <a href="mailto:privacy@nusasec.com" className="text-blue-600 font-semibold hover:underline">privacy@nusasec.com</a>
            </p>
          </Section>

        </div>
      </div>
    </div>
  );
};
