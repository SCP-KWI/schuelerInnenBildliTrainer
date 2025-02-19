import { PDFDocument } from 'pdf-lib';
import fs from 'react-native-fs';
import { Image } from 'react-native';

const extractImagesFromPDF = async (pdfPath: string, outputFolder: string): Promise<string[]> => {
    const pdfBytes = await fs.readFile(pdfPath, 'base64');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const images: string[] = [];

    const pages = pdfDoc.getPages();
    for (const page of pages) {
        const { width, height } = page.getSize();
        const imageCount = page.getImageCount();

        for (let i = 0; i < imageCount; i++) {
            const image = await page.getImage(i);
            const imageBytes = await image.embed();
            const imageBase64 = imageBytes.toString('base64');
            const imageName = `student_${images.length + 1}.png`;
            const imagePath = `${outputFolder}/${imageName}`;

            await fs.writeFile(imagePath, imageBase64, 'base64');
            images.push(imagePath);
        }
    }

    return images;
};

const extractNamesFromPDF = async (pdfPath: string): Promise<string[]> => {
    const pdfBytes = await fs.readFile(pdfPath, 'base64');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const names: string[] = [];

    const pages = pdfDoc.getPages();
    for (const page of pages) {
        const textContent = await page.getTextContent();
        textContent.items.forEach(item => {
            if (item.str) {
                names.push(item.str);
            }
        });
    }

    return names;
};

export { extractImagesFromPDF, extractNamesFromPDF };