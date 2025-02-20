import { addImageToQuiz } from "./main.js";

export const saveImage = (imageDataUrl, fileName) => {
  console.log(`Saving image: ${fileName}`);

  // Add image to quiz
  addImageToQuiz(imageDataUrl, fileName);

  // Provide feedback to the user
  console.log(`Image saved: ${fileName}`);
};
