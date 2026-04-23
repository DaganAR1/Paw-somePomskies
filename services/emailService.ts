
// Web3Forms access key — this is intentionally public (client-side only, read-only)
const WEB3FORMS_KEY = '823082b6-a851-4a20-bcfe-701089118728';

export async function sendEmail(fields: Record<string, any>) {
  // Web3Forms requires the submitter email in a field named "email".
  // Our components send it as "from_email", so we remap it here.
  const { from_email, ...rest } = fields;

  const payload = {
    access_key: WEB3FORMS_KEY,
    botcheck: '',   // honeypot — must be empty for spam protection
    ...(from_email ? { email: from_email } : {}),
    ...rest,
  };

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      return { success: true };
    } else {
      console.error('Web3Forms error:', data);
      return { success: false, error: data.message || 'Submission failed' };
    }
  } catch (error: any) {
    console.error('Network error sending form:', error);
    return { success: false, error: 'Network error' };
  }
}
