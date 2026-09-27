
import React from 'react';

interface TermsAgreementProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({ checked, onChange }) => (
  <label className="flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
    <input
      required
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-1 w-5 h-5 shrink-0 accent-teal-600 cursor-pointer"
    />
    <span>
      I am 18 or older and I have read and agree to the{' '}
      <a href="/#terms" target="_blank" rel="noopener noreferrer" className="text-teal-600 font-bold underline hover:text-teal-500">Terms &amp; Conditions</a>
      , including the binding arbitration and class action waiver. <span className="text-red-500">*</span>
    </span>
  </label>
);

export default TermsAgreement;
