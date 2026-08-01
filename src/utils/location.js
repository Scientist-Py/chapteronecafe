// Helper to fetch user's exact GPS coordinates seamlessly
export function getUserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ available: false, error: 'Geolocation not supported by browser' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        resolve({
          available: true,
          latitude,
          longitude,
          accuracy,
          mapsLink: `https://maps.google.com/?q=${latitude},${longitude}`,
        });
      },
      (error) => {
        resolve({ available: false, error: error.message });
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      }
    );
  });
}
