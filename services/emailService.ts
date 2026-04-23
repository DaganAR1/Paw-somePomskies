
// Web3Forms access key — intentionally public (client-side read-only key)
const WEB3FORMS_KEY = '6a15e1cf-35f5-4717-8bf7-50f555e4a3ae';

export async function sendEmail(fields: Record<string, any>, captchaToken?: string) {
  const { from_email, ...rest } = fields;

  const payload: Record<string, any> = {
    access_key: WEB3FORMS_KEY,
    botcheck: '',   // honeypot spam protection
    ...(captchaToken ? { 'h-captcha-response': captchaToken } : {}),
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
      console.error('Web3Forms rejected submission:', data.message);
      return { success: false, error: data.message || 'Submission failed' };
    }
  } catch (error: any) {
    console.error('Network error:', error);
    return { success: false, error: 'Network error' };
  }
}
