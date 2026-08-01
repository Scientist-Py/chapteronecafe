// Natural Energetic Female Voice Thank-You Confirmation
export function speakThankYouAndRedirect(name = '', redirectUrl = null) {
  try {
    if (!('speechSynthesis' in window)) {
      if (redirectUrl) window.location.href = redirectUrl;
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const cleanName = name.trim();
    const formattedName = cleanName ? `Mr. ${cleanName}` : 'for your order';

    // Short, punchy, energetic female message
    const text = `Thank you ${formattedName}! We are preparing your fresh order right now at Chapter One Cafe!`;

    const utterance = new SpeechSynthesisUtterance(text);

    // Energetic & clear female voice settings
    utterance.rate = 1.0;   // Energetic & crisp speed
    utterance.pitch = 1.15;  // Warm, natural female pitch
    utterance.volume = 1.0;  // Full volume

    // Select natural female English voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const femaleVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.toLowerCase().includes('female') ||
           v.name.includes('Google UK English Female') ||
           v.name.includes('Google US English') ||
           v.name.includes('Samantha') ||
           v.name.includes('Karen') ||
           v.name.includes('Victoria') ||
           v.name.includes('Zira') ||
           v.name.includes('Moira') ||
           v.name.includes('Fiona'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
    }

    let redirected = false;
    const doRedirect = () => {
      if (redirectUrl && !redirected) {
        redirected = true;
        window.location.href = redirectUrl;
      }
    };

    // Redirect ONLY when speech ends completely so WhatsApp never interrupts!
    utterance.onend = doRedirect;
    utterance.onerror = doRedirect;

    // Safety fallback timer (in case browser speech stalls)
    setTimeout(doRedirect, 3500);

    // Speak
    window.speechSynthesis.speak(utterance);

  } catch (e) {
    if (redirectUrl) window.location.href = redirectUrl;
  }
}
