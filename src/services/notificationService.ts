/**
 * Notification service to send unlock notifications
 * Uses FormSubmit - a free public service that accepts anonymous POST requests
 * Completely client-side, no credentials, webhooks, or .env files needed
 */

interface UnlockNotificationData {
  name: string;
  timestamp: string;
  location?: string;
  userAgent: string;
  referrer: string;
  screenResolution: string;
  timezone: string;
}

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
 * Send notification via FormSubmit
 * FormSubmit is a free public service that accepts anonymous POST requests
 * and forwards them as emails - no credentials needed!
 */
const sendFormSubmitNotification = async (data: UnlockNotificationData): Promise<void> => {
  const email = 'horduntech@gmail.com';
  const date = new Date(data.timestamp);
  
  const formData = new FormData();
  formData.append('email', email);
  formData.append('subject', `Website Unlock - ${data.name}`);
  formData.append('message', `Website Unlock Notification

Name: ${data.name}
Time: ${date.toLocaleString()}
Location: ${data.location}
Timezone: ${data.timezone}
Screen Resolution: ${data.screenResolution}
Referrer: ${data.referrer}

User Agent: ${data.userAgent}`);
  
  // FormSubmit public endpoint - no credentials needed!
  // Format: https://formsubmit.co/{email}
  const formSubmitUrl = `https://formsubmit.co/${email}`;
  
  try {
    await fetch(formSubmitUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors', // FormSubmit accepts no-cors requests
    });
    
    // With no-cors mode, we can't read the response, but that's fine
    // The email will still be sent
    console.log('Notification sent via FormSubmit');
  } catch (error) {
    console.error('Error sending notification:', error);
    // Fail silently - don't interrupt user experience
  }
};

/**
 * Send unlock notification
 * This is the main function to call when someone unlocks
 * Completely client-side, no credentials or setup needed!
 */
export const sendUnlockNotification = async (name: string): Promise<void> => {
  try {
    const data = await collectNotificationData(name);
    
    // Send via FormSubmit - completely public, no credentials needed
    await sendFormSubmitNotification(data);
    
    // Also log data for testing/debugging
    console.log('Unlock notification data:', data);
  } catch (error) {
    console.error('Error in sendUnlockNotification:', error);
    // Fail silently - don't interrupt user experience
  }
};

