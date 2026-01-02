/**
 * Notification service to send unlock notifications
 * Uses EmailJS with FormSubmit as fallback
 */

import emailjs from '@emailjs/browser';

interface UnlockNotificationData {
  name: string;
  timestamp: string;
  location?: string;
  userAgent: string;
  referrer: string;
  screenResolution: string;
  timezone: string;
}

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
const RECIPIENT_EMAIL = 'horduntech@gmail.com';

/**
 * Get user's approximate location based on IP using a free geolocation API
 */
const getUserLocation = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.error) {
      return 'Unknown location';
    }
    
    const locationParts = [
      data.city,
      data.region,
      data.country_name,
      data.postal && `(${data.postal})`
    ].filter(Boolean);
    
    return locationParts.join(', ') || 'Unknown location';
  } catch (error) {
    console.error('Error fetching location:', error);
    return 'Unknown location';
  }
};

/**
 * Collect all notification data
 */
const collectNotificationData = async (name: string): Promise<UnlockNotificationData> => {
  const location = await getUserLocation();
  
  return {
    name: name.trim() || 'Anonymous',
    timestamp: new Date().toISOString(),
    location,
    userAgent: navigator.userAgent,
    referrer: document.referrer || 'Direct access',
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};

/**
 * Send notification via FormSubmit (fallback)
 */
const sendFormSubmitNotification = async (data: UnlockNotificationData): Promise<void> => {
  const date = new Date(data.timestamp);
  
  const formData = new FormData();
  formData.append('email', RECIPIENT_EMAIL);
  formData.append('subject', `Website Unlock - ${data.name}`);
  formData.append('message', `Website Unlock Notification

Name: ${data.name}
Time: ${date.toLocaleString()}
Location: ${data.location}
Timezone: ${data.timezone}
Screen Resolution: ${data.screenResolution}
Referrer: ${data.referrer}

User Agent: ${data.userAgent}`);
  
  const formSubmitUrl = `https://formsubmit.co/${RECIPIENT_EMAIL}`;
  
  try {
    await fetch(formSubmitUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    });
    
    console.log('Notification sent via FormSubmit (fallback)');
  } catch (error) {
    console.error('Error sending notification via FormSubmit:', error);
  }
};

/**
 * Send notification via EmailJS
 */
const sendEmailJSNotification = async (data: UnlockNotificationData): Promise<boolean> => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
    console.warn('EmailJS not configured, will use FormSubmit fallback');
    return false;
  }

  const date = new Date(data.timestamp);
  
  try {
    // Initialize EmailJS with public key
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Prepare template parameters
    const templateParams = {
      to_email: RECIPIENT_EMAIL,
      subject: `Website Unlock - ${data.name}`,
      name: data.name,
      timestamp: date.toLocaleString(),
      location: data.location || 'Unknown',
      timezone: data.timezone,
      screen_resolution: data.screenResolution,
      referrer: data.referrer,
      user_agent: data.userAgent,
    };
    
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    console.log('Notification sent via EmailJS');
    return true;
  } catch (error) {
    console.error('Error sending notification via EmailJS:', error);
    return false;
  }
};

/**
 * Send unlock notification
 * Tries EmailJS first, falls back to FormSubmit if EmailJS fails or isn't configured
 */
export const sendUnlockNotification = async (name: string): Promise<void> => {
  try {
    const data = await collectNotificationData(name);
    
    // Try EmailJS first
    const emailJSSuccess = await sendEmailJSNotification(data);
    
    // Fallback to FormSubmit if EmailJS failed or isn't configured
    if (!emailJSSuccess) {
      await sendFormSubmitNotification(data);
    }
    
    // Also log data for testing/debugging
    console.log('Unlock notification data:', data);
  } catch (error) {
    console.error('Error in sendUnlockNotification:', error);
    // Fail silently - don't interrupt user experience
  }
};

