
export async function sendEmail(fields: Record<string, any>) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  if (!accessKey) {
    console.error('Web3Forms access key not set. Add VITE_WEB3FORMS_KEY to your .env file.');
    return { success: false, error: 'Missing access key' };
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: accessKey, ...fields }),
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
