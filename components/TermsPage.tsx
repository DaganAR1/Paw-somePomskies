
import React from 'react';
import { BREEDER_CONTACT_EMAIL, BREEDER_PHONE } from '../constants';

interface TermsPageProps {
  onBackToHome: () => void;
}

const EFFECTIVE_DATE = 'September 27, 2026';

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Acceptance of Terms',
    body: (
      <p>
        By accessing or using the Paw-some Pomskies website (the "Site"), you agree to these Terms and Conditions. If you do not agree, please do not use the Site. We may update these terms at any time, and continued use of the Site after changes are posted means you accept the updated terms.
      </p>
    ),
  },
  {
    title: 'Intellectual Property & Image Use',
    body: (
      <>
        <p>
          All content on this Site — including but not limited to photographs and videos of our puppies, parent dogs, and litters, as well as our logo, name, text, graphics, and page design — is the property of Paw-some Pomskies and is protected by United States and international copyright and trademark laws.
        </p>
        <p>You may <strong>not</strong>, without our prior written permission:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Copy, download, screenshot, save, or reproduce our photos or videos for use elsewhere;</li>
          <li>Post our images on other websites, social media accounts, marketplaces, or classified ads;</li>
          <li>Use our images or content to advertise, sell, or represent any animal that is not ours;</li>
          <li>Edit, crop, remove watermarks from, or otherwise alter our images;</li>
          <li>Use our name, logo, or branding in a way that suggests affiliation with or endorsement by us.</li>
        </ul>
        <p>
          Using breeder photos to advertise puppies that do not exist or do not belong to the advertiser is a common tactic in puppy scams. We actively monitor for misuse of our images and will pursue all available remedies, including DMCA takedown notices and legal action, against anyone who uses our content without permission.
        </p>
        <p>
          You are welcome to share links to our Site or our official social media posts using the platform's built-in share features, provided the content is not altered and credit to Paw-some Pomskies remains intact.
        </p>
      </>
    ),
  },
  {
    title: 'Beware of Scams',
    body: (
      <p>
        We only communicate and accept inquiries through the contact information listed on this Site and our official social media accounts. If you see our photos or name on another website or listing, or are contacted by someone claiming to represent us through other channels, please contact us directly at {BREEDER_CONTACT_EMAIL} to verify before sending any money.
      </p>
    ),
  },
  {
    title: 'Puppy Listings & Availability',
    body: (
      <p>
        Puppy descriptions, photos, colors, ages, weights, and availability are provided in good faith but are subject to change without notice. Adult size, coat, and eye color estimates are not guarantees. Listing a puppy on the Site is not an offer to sell, and we reserve the right to decline any application at our discretion.
      </p>
    ),
  },
  {
    title: 'Applications, Waitlist & Deposits',
    body: (
      <p>
        Submitting an adoption or waitlist application does not reserve a puppy or guarantee placement. A puppy is only reserved once we have approved your application and a deposit has been received. The specific terms of any sale — including deposit amounts, refund eligibility, health guarantee, and pickup or delivery arrangements — are set out in our written puppy sales contract, which governs if it conflicts with anything on this Site.
      </p>
    ),
  },
  {
    title: 'Guardian Home Program',
    body: (
      <p>
        Participation in our Guardian Home program is governed by a separate written guardian agreement. Nothing on this Site creates a guardian arrangement or transfers ownership of any dog.
      </p>
    ),
  },
  {
    title: 'Information You Submit',
    body: (
      <p>
        When you submit a form on the Site, you agree to provide accurate information. We use the information you send us (such as your name, email, phone number, and details about your home) only to respond to your inquiry and evaluate your application. We do not sell your personal information.
      </p>
    ),
  },
  {
    title: 'Educational Content',
    body: (
      <p>
        Blog posts, care guides, and any responses from the on-site assistant are provided for general informational purposes only and are not a substitute for advice from a licensed veterinarian.
      </p>
    ),
  },
  {
    title: 'Disclaimer & Limitation of Liability',
    body: (
      <p>
        The Site is provided "as is" without warranties of any kind. To the fullest extent permitted by law, Paw-some Pomskies is not liable for any indirect, incidental, or consequential damages arising from your use of the Site. Any warranties relating to a puppy are provided solely through our written sales contract.
      </p>
    ),
  },
  {
    title: 'Governing Law',
    body: (
      <p>
        These terms are governed by the laws of the State of Texas, without regard to its conflict-of-law rules. Any dispute relating to the Site will be handled in the state or federal courts located in Texas.
      </p>
    ),
  },
  {
    title: 'Contact Us',
    body: (
      <p>
        Questions about these terms, or requests to use our images, can be sent to{' '}
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
          <p className="text-teal-100 opacity-80 text-sm uppercase tracking-widest font-bold">Effective {EFFECTIVE_DATE}</p>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
