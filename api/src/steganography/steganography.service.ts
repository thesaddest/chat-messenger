import Jimp from "jimp";

const BITS_PER_BYTE = 8;

class SteganographyService {
    private readonly encoder = new TextEncoder();
    private readonly decoder = new TextDecoder();

    async embedMessage(message: string): Promise<Buffer> {
        const image = await Jimp.read(process.env.AWS_STEGANOGRAPHY_IMAGE_PATH);
        const binaryMessage = this.encodeMessage(message);
        this.embedBinaryMessage(image.bitmap.data, binaryMessage);
        return await image.getBufferAsync(Jimp.MIME_PNG);
    }

    async revealMessage(s3Link: string): Promise<string> {
        const image = await Jimp.read(s3Link);
        const binaryMessage = this.extractBinaryMessage(image);
        const message = this.decoder.decode(this.decodeMessage(binaryMessage));
        return message.slice(0, -1);
    }

    private encodeMessage(message: string): string {
        // This line uses the TextEncoder API to encode the message string as a Uint8Array,
        // and then creates an array of integers from it using Array.from().
        // The resulting array contains one integer for each byte in the message.
        return Array.from(this.encoder.encode(message))
            .map((byte) => byte.toString(2).padStart(BITS_PER_BYTE, "0"))
            .join("");
    }

    private embedBinaryMessage(data: Buffer, binaryMessage: string): void {
        let pixelIndex = 0;
        for (let i = 0; i < binaryMessage.length; i++) {
            const binaryPixel = data[pixelIndex].toString(2).padStart(BITS_PER_BYTE, "0");
            const newBinaryPixel = binaryPixel.slice(0, -1) + binaryMessage[i];
            data[pixelIndex] = parseInt(newBinaryPixel, 2);
            pixelIndex += 4; // RGBA pixels are 4 bytes long
        }
    }

    private extractBinaryMessage(image: Jimp): string {
        let binaryMessage = "";
        for (let y = 0; y < image.bitmap.height; y++) {
            for (let x = 0; x < image.bitmap.width; x++) {
                // These lines extract the red component of the pixel at the current x,y position and convert it to a binary string.
                // The string is padded with leading zeros to ensure it is BITS_PER_BYTE characters long.
                const rgba = Jimp.intToRGBA(image.getPixelColor(x, y));
                const binaryPixel = rgba.r.toString(2).padStart(BITS_PER_BYTE, "0");
                binaryMessage += binaryPixel[binaryPixel.length - 1];
                if (binaryMessage.length % BITS_PER_BYTE === 0) {
                    const byteString = binaryMessage.slice(-BITS_PER_BYTE);
                    if (byteString === "00000000") {
                        return binaryMessage.slice(0, -BITS_PER_BYTE);
                    }
                }
            }
        }
        return binaryMessage;
    }

    private decodeMessage(binaryMessage: string): Uint8Array {
        return new Uint8Array(
            binaryMessage.match(new RegExp(`.{1,${BITS_PER_BYTE}}`, "g")).map((byte) => parseInt(byte, 2)),
        );
    }
}

export const steganographyService = new SteganographyService();
