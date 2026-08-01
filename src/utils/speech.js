// Web Speech API Voice Thank You Confirmation
export function speakThankYou(name = 'Customer') {
  try {
    if (!('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const text = `Thank you ${name} for your order! Your order will be ready soon at Chapter One Cafe!`;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = 'en-IN'; // Indian English or fallback
    utterance.rate = 0.9;    // Smooth, clear speed
    utterance.pitch = 1.0;   // Clear natural tone
    utterance.volume = 1.0;  // Full volume

    // Speak text
    window.speechSynthesis.speak(utterance);

  } catch (e) {
    // Ignore speech errors
  }
}
