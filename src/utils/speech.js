// Simple Natural Voice Thank-You Confirmation
export function speakThankYouAndRedirect(name = '', redirectUrl = null) {
  try {
    if (!('speechSynthesis' in window)) {
      if (redirectUrl) window.location.href = redirectUrl;
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const cleanName = name.trim() || 'for your order';
    
    // Simple, clean, natural message: "Thank you Rahul for your order!"
    const text = cleanName === 'for your order' 
      ? 'Thank you for your order!' 
      : `Thank you ${cleanName} for your order!`;

    const utterance = new SpeechSynthesisUtterance(text);

    // Natural voice settings
    utterance.lang = 'en-IN'; // Indian English or natural fallback
    utterance.rate = 0.95;   // Clear, natural speed
    utterance.pitch = 1.0;   // Natural pitch
    utterance.volume = 1.0;  // Full volume

    // Select natural voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const preferredVoice = voices.find(
        (v) =>
          (v.lang.includes('en-IN') || v.lang.includes('en-US') || v.lang.includes('en-GB')) &&
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Rishi'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }

    let redirected = false;
    const doRedirect = () => {
      if (redirectUrl && !redirected) {
        redirected = true;
        window.location.href = redirectUrl;
      }
    };

    // Redirect ONLY when speech ends completely so WhatsApp never interrupts
    utterance.onend = doRedirect;
    utterance.onerror = doRedirect;

    // Safety fallback timer
    setTimeout(doRedirect, 2500);

    // Speak
    window.speechSynthesis.speak(utterance);

  } catch (e) {
    if (redirectUrl) window.location.href = redirectUrl;
  }
}
