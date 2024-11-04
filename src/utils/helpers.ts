// Function to check if an image is available
export const checkImageAvailability = (url: string, callback: (isAvailable: boolean) => void) => {
  const img = new Image();
  img.src = url;

  img.onload = () => callback(true); // If the image is available
  img.onerror = () => callback(false); // If the image is not available
};
