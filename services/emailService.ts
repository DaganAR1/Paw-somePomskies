
export async function sendEmail(fields: Record<string, any>) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  if (!accessKey) {
    console.error('Web3Forms access key not set. Add VITE_WEB3FORMS_KEY to your .env file.');
    return { success: false, error: 'Missing access key' };
  }

  // Web3Forms requires the submitter email to be in a field named "email".
  // Our components send it as "from_email", so we remap it here.
  const { from_email, ...rest } = fields;

  const payload = {
    access_key: accessKey,
    botcheck: '',          // honeypot — must be empty for spam protection
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
