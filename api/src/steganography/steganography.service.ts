import Jimp from "jimp";

class SteganographyService {
    async embedMessage(message: string): Promise<Buffer> {
        const image = await Jimp.read(process.env.AWS_STEGANOGRAPHY_IMAGE_PATH);
        const binaryMessage = message
            .split("")
            .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
            .join("");
        const messageLength = binaryMessage.length;
        let pixelIndex = 0;
        for (let i = 0; i < messageLength; i++) {
            const binaryPixel = image.bitmap.data[pixelIndex].toString(2).padStart(8, "0");
            const newBinaryPixel = binaryPixel.slice(0, -1) + binaryMessage[i];
            image.bitmap.data[pixelIndex] = parseInt(newBinaryPixel, 2);
            pixelIndex += 4; // RGBA pixels are 4 bytes long
        }

        return await image.getBufferAsync(Jimp.MIME_PNG);
    }

    async revealMessage(s3Link: string): Promise<string> {
        const image = await Jimp.read(s3Link);

        let binaryMessage = "";
        for (let y = 0; y < image.bitmap.height; y++) {
            for (let x = 0; x < image.bitmap.width; x++) {
                const rgba = Jimp.intToRGBA(image.getPixelColor(x, y));
                const binaryPixel = rgba.r.toString(2).padStart(8, "0");
                const lsb = binaryPixel[binaryPixel.length - 1];
                binaryMessage += lsb;
                if (binaryMessage.length % 8 === 0) {
                    const message = [];
                    for (let i = 0; i < binaryMessage.length; i += 8) {
                        const binaryChar = binaryMessage.substring(i, i + 8);
                        const charCode = parseInt(binaryChar, 2);
                        const char = String.fromCharCode(charCode);
                        message.push(char);
                    }
                    const decodedMessage = message.join("");
                    if (decodedMessage.endsWith(String.fromCharCode(0))) {
                        return decodedMessage.slice(0, -1);
                    } else {
                        binaryMessage =
                            decodedMessage
                                .slice(0, -1)
                                .split("")
                                .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
                                .join("") + binaryMessage.slice(-8);
                    }
                }
            }
        }
    }
}

export const steganographyService = new SteganographyService();
