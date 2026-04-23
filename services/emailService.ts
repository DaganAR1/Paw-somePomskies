
// Web3Forms access key — intentionally public (client-side read-only key)
const WEB3FORMS_KEY = '823082b6-a851-4a20-bcfe-701089118728';

export async function sendEmail(fields: Record<string, any>, captchaToken?: string) {
  const { from_email, ...rest } = fields;

  const payload: Record<string, any> = {
    access_key: WEB3FORMS_KEY,
    ...(from_email ? { email: from_email } : {}),
    ...rest,
  };

  if (captchaToken) {
    payload['cf-turnstile-response'] = captchaToken;
  }

  console.log('Submitting to Web3Forms:', { ...payload, access_key: '[hidden]' });

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('Web3Forms response:', data);

    if (data.success) {
      return { success: true };
    } else {
      console.error('Web3Forms rejected submission:', data.message);
      return { success: false, error: data.message || 'Submission failed' };
    }
  } catch (error: any) {
    console.error('Network error:', error);
    return { success: false, error: 'Network error' };
  }
}
