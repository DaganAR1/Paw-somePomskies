
/**
 * Email Service for Paw-some Pomskies
 * Handles real email delivery using EmailJS API.
 */

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export async function sendEmail(templateParams: Record<string, any>) {
  const savedConfig = localStorage.getItem('pawsome_email_config');
  
  if (!savedConfig) {
    console.error('Email service not configured in Breeder Portal.');
    return { success: false, error: 'Configuration Missing' };
  }

  const config: EmailConfig = JSON.parse(savedConfig);

  if (!config.serviceId || !config.templateId || !config.publicKey) {
    console.error('Email service keys are incomplete.');
    return { success: false, error: 'Incomplete Config' };
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        template_params: templateParams,
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const err = await response.text();
      console.error('EmailJS Error:', err);
      return { success: false, error: err };
    }
  } catch (error) {
    console.error('Network Error sending email:', error);
    return { success: false, error: 'Network Error' };
  }
}
