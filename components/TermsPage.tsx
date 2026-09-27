
import React from 'react';
import { BREEDER_CONTACT_EMAIL, BREEDER_PHONE } from '../constants';

interface TermsPageProps {
  onBackToHome: () => void;
}

export const TERMS_EFFECTIVE_DATE = 'September 27, 2026';

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Agreement to Terms',
    body: (
      <>
        <p>
          These Terms and Conditions ("Terms") are a legally binding agreement between you and Paw-some Pomskies ("we," "us," or "our") governing your access to and use of this website, our official social media pages, and any content, forms, or services offered through them (collectively, the "Site").
        </p>
        <p>
          By accessing or using the Site, or by submitting any application, inquiry, or waitlist request, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not use the Site. You must be at least 18 years old to submit an application or enter into any agreement with us.
        </p>
        <p className="font-bold text-slate-800">
          PLEASE READ SECTION 15 CAREFULLY. IT REQUIRES MOST DISPUTES TO BE RESOLVED BY INDIVIDUAL BINDING ARBITRATION AND WAIVES YOUR RIGHT TO A JURY TRIAL AND TO PARTICIPATE IN A CLASS ACTION.
        </p>
      </>
    ),
  },
  {
    title: 'Ownership of Content',
    body: (
      <p>
        All content on the Site — including all photographs, videos, and likenesses of our puppies, parent dogs, guardian dogs, and litters; our name, logo, and branding; and all text, graphics, page layouts, and designs (collectively, "Our Content") — is owned by or licensed to Paw-some Pomskies and is protected by United States and international copyright, trademark, and unfair competition laws. All rights not expressly granted to you in these Terms are reserved.
      </p>
    ),
  },
  {
    title: 'Limited License & Prohibited Uses of Our Images',
    body: (
      <>
        <p>
          We grant you a limited, personal, non-exclusive, non-transferable, revocable license to view Our Content on the Site solely for your own non-commercial use in considering a puppy from us. Any other use is strictly prohibited. Without our prior <strong>written</strong> permission, you may not:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Copy, download, screenshot, screen-record, save, print, or otherwise reproduce Our Content;</li>
          <li>Post, upload, repost, or distribute Our Content on any other website, social media account, marketplace, classified ad, or messaging platform;</li>
          <li>Use Our Content to advertise, sell, or represent any animal, including any animal that is not ours or does not exist;</li>
          <li>Edit, crop, filter, or alter Our Content, or remove, obscure, or modify any watermark, logo, or copyright notice;</li>
          <li>Use Our Content, or scrape, crawl, or harvest it by automated means, for any commercial purpose, database, or to train, test, or develop any artificial intelligence or machine learning system;</li>
          <li>Create derivative works based on Our Content, including AI-generated images derived from it;</li>
          <li>Use our name, logo, or branding in any way that suggests affiliation with, sponsorship by, or endorsement by us.</li>
        </ul>
        <p>
          Sharing a direct link to the Site or to our official social media posts using a platform's built-in share feature is permitted, provided Our Content is not altered and credit to Paw-some Pomskies remains visible.
        </p>
        <p>
          Any breach of this section immediately terminates your license. Unauthorized use of our images may constitute copyright infringement, for which U.S. law provides statutory damages of up to $150,000 per work for willful infringement (17 U.S.C. § 504), as well as trademark infringement, fraud, and other violations. We actively monitor for misuse and will pursue all available remedies, including DMCA takedown notices to hosting providers and platforms, reports to law enforcement, and civil action seeking damages, injunctive relief, and recovery of our attorneys' fees and costs to the extent permitted by law.
        </p>
      </>
    ),
  },
  {
    title: 'Scam Warning',
    body: (
      <p>
        Scammers frequently steal breeder photos to advertise puppies that do not exist. We only communicate through the phone number, email address, and official social media accounts listed on this Site. We are not responsible for any loss you suffer from dealing with anyone who is impersonating us or using our images. Before sending any money, verify directly with us at {BREEDER_CONTACT_EMAIL} or {BREEDER_PHONE}. If you see our photos or name used elsewhere, please report it to us.
      </p>
    ),
  },
  {
    title: 'Prohibited Conduct',
    body: (
      <>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Submit false, misleading, or someone else's information in any application or inquiry;</li>
          <li>Impersonate us or any other person, or misrepresent your affiliation with us;</li>
          <li>Attempt to gain unauthorized access to the Site, our admin portal, or our data, or interfere with the Site's operation or security;</li>
          <li>Use the Site to send spam or to transmit malware or any harmful code;</li>
          <li>Use the Site for any unlawful purpose or in violation of these Terms.</li>
        </ul>
        <p>We may suspend or block your access to the Site at any time, for any reason, without notice.</p>
      </>
    ),
  },
  {
    title: 'Puppy Listings & No Guarantee of Availability',
    body: (
      <p>
        Puppy descriptions, photos, prices, colors, markings, ages, weights, and availability are provided for general information and may change without notice. Estimates of adult size, weight, coat, eye color, and temperament are predictions only and are not guarantees. Photos may not reflect a puppy's current appearance. Any listing on the Site is an invitation to apply, not an offer to sell, and we reserve the right to refuse any application or sale at our sole discretion. We are not responsible for typographical or photographic errors.
      </p>
    ),
  },
  {
    title: 'Applications, Waitlist, Deposits & Sales Contract',
    body: (
      <>
        <p>
          Submitting an adoption application, waitlist request, or inquiry does not reserve a puppy, create a contract of sale, or guarantee placement. A puppy is reserved only after we approve your application in writing and receive your deposit.
        </p>
        <p>
          Every sale is governed exclusively by our written puppy sales contract, which sets out deposit terms, refund eligibility, any health guarantee, spay/neuter or breeding requirements, and pickup or delivery terms. If anything on the Site conflicts with the signed sales contract, the sales contract controls. Unless your signed sales contract expressly states otherwise, deposits are non-refundable.
        </p>
      </>
    ),
  },
  {
    title: 'Animals Are Living Beings — Assumption of Risk',
    body: (
      <p>
        You acknowledge that dogs are living animals whose health, genetics, size, and temperament can never be fully predicted or guaranteed. Except for any written health guarantee in your signed sales contract, we make no representation or warranty regarding any animal's future health, genetics, appearance, size, or behavior. Once you take possession of a puppy, you assume full responsibility for its care, conduct, and any injury or damage it may cause. If you visit our home or property, or meet us for pickup or transport, you do so at your own risk, and you are responsible for supervising any children or guests with you.
      </p>
    ),
  },
  {
    title: 'Guardian Home Program',
    body: (
      <p>
        Participation in our Guardian Home program is governed solely by a separate written guardian agreement. Nothing on the Site creates a guardian arrangement, transfers ownership of any dog, or obligates us to place any dog with you.
      </p>
    ),
  },
  {
    title: 'Information You Submit & Your Submissions',
    body: (
      <>
        <p>
          You agree that information you submit is accurate and complete. We use it to respond to you and to evaluate your application, and we do not sell your personal information. By submitting information, you consent to our contacting you by email, phone, or text message about your inquiry.
        </p>
        <p>
          If you send us reviews, testimonials, photos, or videos (for example, of a puppy after it goes home), you grant us a perpetual, royalty-free, worldwide license to use, reproduce, and display them, along with your first name and general location, on the Site and in our marketing. You confirm you have the right to grant this license.
        </p>
      </>
    ),
  },
  {
    title: 'Educational Content & Third-Party Links',
    body: (
      <p>
        Blog posts, care guides, and any responses from the Site's automated assistant are for general information only and are not veterinary, medical, or legal advice. Always consult a licensed veterinarian about your dog's health. Automated assistant responses may be inaccurate and do not bind us. Links to third-party sites (such as social media, review sites, or maps) are provided for convenience only; we do not control and are not responsible for them.
      </p>
    ),
  },
  {
    title: 'Disclaimer of Warranties',
    body: (
      <p className="uppercase text-sm">
        The Site and all of its content are provided "as is" and "as available," without warranties of any kind, express or implied, including any implied warranties of merchantability, fitness for a particular purpose, title, accuracy, and non-infringement. We do not warrant that the Site will be uninterrupted, error-free, secure, or free of viruses. Any warranty relating to an animal is provided only through a signed sales contract.
      </p>
    ),
  },
  {
    title: 'Limitation of Liability',
    body: (
      <p className="uppercase text-sm">
        To the fullest extent permitted by law, Paw-some Pomskies and its owners, family members, and agents will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, data, or goodwill, arising out of or relating to the Site or these Terms, even if advised of the possibility of such damages. Our total liability for any claim arising out of or relating to the Site or these Terms will not exceed one hundred U.S. dollars ($100). Liability relating to the purchase of a puppy is governed solely by the signed sales contract. Some jurisdictions do not allow certain limitations, so some of these limitations may not apply to you.
      </p>
    ),
  },
  {
    title: 'Indemnification',
    body: (
      <p>
        You agree to defend, indemnify, and hold harmless Paw-some Pomskies and its owners, family members, and agents from any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to your use of the Site, your violation of these Terms, your misuse of Our Content, or your violation of any law or the rights of any third party.
      </p>
    ),
  },
  {
    title: 'Dispute Resolution, Arbitration & Class Action Waiver',
    body: (
      <>
        <p>
          <strong>Informal resolution first.</strong> Before filing any claim, you agree to contact us in writing at {BREEDER_CONTACT_EMAIL} and try in good faith to resolve the dispute for at least 30 days.
        </p>
        <p>
          <strong>Binding arbitration.</strong> Any dispute arising out of or relating to the Site or these Terms that is not resolved informally will be resolved by final and binding individual arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules, held in Texas or by video conference. The Federal Arbitration Act governs this section. Either party may instead bring an individual claim in small claims court if it qualifies. Nothing in this section prevents us from seeking an injunction or other relief in court to stop infringement or misuse of Our Content or our intellectual property.
        </p>
        <p>
          <strong>Class action and jury waiver.</strong> You and we each agree to bring claims only in an individual capacity and not as a plaintiff or class member in any class, collective, or representative proceeding, and each waives the right to a jury trial.
        </p>
        <p>
          <strong>Time limit.</strong> To the extent permitted by law, any claim relating to the Site must be brought within one (1) year after it arises, or it is permanently barred.
        </p>
      </>
    ),
  },
  {
    title: 'Governing Law & Venue',
    body: (
      <p>
        These Terms are governed by the laws of the State of Texas and applicable federal law, without regard to conflict-of-law rules. For any matter not subject to arbitration, you consent to the exclusive jurisdiction and venue of the state and federal courts located in Dallas County, Texas.
      </p>
    ),
  },
  {
    title: 'Changes, Termination & General Terms',
    body: (
      <>
        <p>
          We may update these Terms at any time by posting a revised version with a new effective date. Your continued use of the Site after changes are posted constitutes acceptance. Terms in effect when you submit an application apply to that application.
        </p>
        <p>
          If any provision of these Terms is found unenforceable, it will be enforced to the maximum extent permissible and the remaining provisions will remain in full effect. Our failure to enforce any provision is not a waiver of it. These Terms, together with any signed sales contract or guardian agreement, are the entire agreement between you and us regarding the Site. You may not assign these Terms; we may assign them without restriction. We are not liable for any delay or failure caused by events beyond our reasonable control. Sections that by their nature should survive termination — including ownership, prohibited uses, disclaimers, limitation of liability, indemnification, and dispute resolution — will survive.
        </p>
      </>
    ),
  },
  {
    title: 'Copyright Complaints & Contact',
    body: (
      <p>
        To request permission to use our images, report misuse of Our Content, or ask any question about these Terms, contact us at{' '}
        <a href={`mailto:${BREEDER_CONTACT_EMAIL}`} className="text-teal-600 font-bold hover:underline">{BREEDER_CONTACT_EMAIL}</a>{' '}
        or {BREEDER_PHONE}.
      </p>
    ),
  },
];

const TermsPage: React.FC<TermsPageProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-teal-900 text-white py-24 relative overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <button onClick={onBackToHome} className="mb-8 inline-flex items-center gap-2 text-teal-300 hover:text-white transition-colors group font-black uppercase tracking-widest text-xs"><svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>Back to Home</button>
          <h1 className="text-4xl md:text-6xl font-black mb-6">Terms &amp; Conditions</h1>
          <p className="text-teal-100 opacity-80 text-sm uppercase tracking-widest font-bold">Effective {TERMS_EFFECTIVE_DATE}</p>
        </div>
      </header>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-slate-100 p-8 md:p-16 space-y-12">
            {sections.map((s, i) => (
              <div key={s.title} className="space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-teal-600 rounded-full shrink-0"></span>
                  {i + 1}. {s.title}
                </h2>
                <div className="text-slate-600 leading-relaxed space-y-4">{s.body}</div>
              </div>
            ))}
            <p className="pt-8 border-t border-slate-100 text-center text-xs uppercase tracking-widest text-slate-400 font-bold">
              &copy; {new Date().getFullYear()} Paw-some Pomskies. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
