const Jimp = require('jimp');
const path = require('path');

async function makeTransparent(filename) {
    const image = await Jimp.read(filename);
    
    // We want to make white (and near white) transparent
    // white is usually 255, 255, 255
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        // Threshold for "white"
        if (r > 240 && g > 240 && b > 240) {
            this.bitmap.data[idx + 3] = 0; // Alpha to 0
        }
    });

    const outputName = 'transparent_' + filename;
    await image.writeAsync(outputName);
    console.log(`Saved ${outputName}`);
}

const files = ['logo_horizontal.png', 'logo_square.png'];
files.forEach(makeTransparent);
