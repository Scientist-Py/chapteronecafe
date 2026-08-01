// Impressive High-Quality Web Speech API Voice Thank You Confirmation
export function speakThankYou(name = '') {
  try {
    if (!('speechSynthesis' in window)) return;

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const cleanName = name.trim();
    const formattedName = cleanName ? `Mr. ${cleanName}` : 'Valued Customer';

    // Impressive, warm, executive voice message
    const text = `Thank you ${formattedName} for your order! We are working on your delicious food right now at Chapter One Cafe. It will be freshly prepared and ready for you very soon!`;

    const utterance = new SpeechSynthesisUtterance(text);

    // Voice tuning for ultra-impressive delivery
    utterance.rate = 0.88;   // Elegant, unhurried pace
    utterance.pitch = 1.02;  // Warm, friendly pitch
    utterance.volume = 1.0;  // Clear volume

    // Try to select the best available natural voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      // Find premium Indian or natural English voice
      const preferredVoice = voices.find(
        (v) =>
          (v.lang.includes('en-IN') || v.lang.includes('en-US') || v.lang.includes('en-GB')) &&
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Rishi'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }

    // Speak
    window.speechSynthesis.speak(utterance);

  } catch (e) {
    // Ignore audio permission errors
  }
}
