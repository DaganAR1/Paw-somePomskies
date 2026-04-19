
import emailjs from '@emailjs/browser';

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
    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
      config.publicKey
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      console.error('EmailJS Error:', response.text);
      return { success: false, error: response.text };
    }
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error?.text || 'Network Error' };
  }
}
