/**
 * Represents the result of a try-on process.
 */
export interface TryOnResult {
  /**
   * The URL of the generated image.
   */
  imageUrl: string;
}

/**
 * Asynchronously processes the try-on request by sending the user image and clothing image to the backend.
 *
 * @param userImage The user's image file.
 * @param clothingImage The clothing image file.
 * @param userId The ID of the user.
 * @returns A promise that resolves to a TryOnResult object containing the URL of the generated image.
 */
export async function processTryOn(
  userImage: File,
  clothingImage: File,
  userId: string
): Promise<TryOnResult> {
  // TODO: Implement this by calling an API.
  console.log('Simulating sending images to backend', {
    userImage: userImage.name,
    clothingImage: clothingImage.name,
    userId,
  });

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate a random seed for picsum.photos to get different images
  const randomSeed = Math.floor(Math.random() * 1000);

  return {
    // Using picsum.photos for dynamic placeholder images.
    // The actual backend would return a path like '/results/generated_image.jpg'
    imageUrl: `https://picsum.photos/seed/${randomSeed}/400/600`,
  };
}
