import fs from "fs/promises";
import path from "path";

/**
 * Deletes a file from the public/uploads directory.
 * @param imageUrl The URL of the image (e.g., "/uploads/filename.png")
 */
export async function deleteLocalFile(imageUrl: string | null | undefined): Promise<boolean> {
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) {
    return false;
  }

  try {
    const filename = imageUrl.replace("/uploads/", "");
    // Prevent directory traversal attacks
    const cleanFilename = path.basename(filename);
    const filePath = path.join(process.cwd(), "public", "uploads", cleanFilename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      console.log(`File cleanup: File not found on disk, skipping: ${filePath}`);
      return true; // Consider it deleted
    }

    // Unlink/Delete file
    await fs.unlink(filePath);
    console.log(`File cleanup: Successfully deleted local file: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`File cleanup error for ${imageUrl}:`, error);
    return false;
  }
}
