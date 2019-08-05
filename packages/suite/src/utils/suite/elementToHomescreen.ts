/* eslint-disable no-bitwise */
/* eslint-disable prefer-spread */ // to be refactored

import * as pako from 'pako';
import * as _ from 'lodash';

const T1_WIDTH = 128;
const T1_HEIGHT = 64;

const T2_WIDTH = 144;
const T2_HEIGHT = 144;

const getWidth = model => {
    if (model === 2) {
        return T2_WIDTH;
    }
    return T1_WIDTH;
};

const getHeight = model => {
    if (model === 2) {
        return T2_HEIGHT;
    }
    return T1_HEIGHT;
};

const range = (a: number, b?: number) => {
    return _.range(a, b);
};

function byteArrayToHexString(byteArray: number[]): string {
    return Array.from(byteArray, byte => {
        return `0${(byte & 0xff).toString(16)}`.slice(-2);
    }).join('');
}

function rightPad(len: number, val: string) {
    while (val.length < len) {
        val = `${val}0`;
    }
    return val;
}

function evenPad(val: string) {
    if (val.length % 2 === 0) return val;
    return `0${val}`;
}

function chunkString(size: number, str: string) {
    const re = new RegExp(`.{1,${size}}`, 'g');
    const result = str.match(re);
    if (!result) return [];
    return result;
}

const getCanvas = (): HTMLCanvasElement => {
    const canvasId = 'homescreen-canvas';
    const canvas: HTMLElement = document.getElementById(canvasId);
    if (canvas != null && canvas instanceof HTMLCanvasElement) {
        return canvas;
    }
    const newCanvas = document.createElement('canvas');
    newCanvas.id = canvasId;
    newCanvas.style.visibility = 'hidden';
    const { body } = document;
    if (body == null) {
        throw new Error('document.body is null');
    }
    body.appendChild(newCanvas);
    return newCanvas;
};

// assuming max = x = y here
const isOutsideCircle = (max, row, col) => {
    const half = max / 2;
    const dx = col - half;
    const dy = row - half;
    return Math.sqrt(dx ** 2 + dy ** 2) >= half;
};

const toig = (w, h, imageData) => {
    const homescreen = range(h)
        .map(j =>
            range(w / 8)
                .map(i => {
                    const bytestr = range(8)
                        .map(k => (j * w + i * 8 + k) * 4)
                        .map(index => (imageData.data[index] === 0 ? '0' : '1'))
                        .join('');
                    return String.fromCharCode(parseInt(bytestr, 2));
                })
                .join(''),
        )
        .join('');
    const hex = homescreen
        .split('')
        .map(letter => letter.charCodeAt(0))
        .map(charCode => charCode & 0xff)
        .map(charCode => charCode.toString(16))
        .map(chr => (chr.length < 2 ? `0${chr}` : chr))
        .join('');
    return hex;
};

const toif = (w, h, imageData) => {
    // concat does [[1, 2], [3, 4]] -> [1, 2, 3, 4] here
    const pixels = [].concat.apply(
        [],
        range(h).map(row => {
            return range(w).map(col => {
                const i = row * w + col;
                // draw black outside the visible area for smaller image size
                if (isOutsideCircle(w, row, col)) {
                    return 0;
                }
                const r = imageData.data[4 * i];
                const g = imageData.data[4 * i + 1];
                const b = imageData.data[4 * i + 2];
                return ((r & 0xf8) << 8) | ((g & 0xfc) << 3) | ((b & 0xf8) >> 3);
            });
        }),
    );

    // Uint16Array -> Uint8Array
    const bytes = [].concat.apply(
        [],
        pixels.map(p => {
            return [Math.floor(p / 256), p % 256];
        }),
    );

    const packed = pako.deflateRaw(bytes, {
        level: 9,
        windowBits: 10,
    });

    // TOIf
    let header = '544f4966';
    // width
    header += '9000';
    // height
    header += '9000';
    let length = Number(packed.length).toString(16);
    if (length.length % 2 > 0) {
        length = evenPad(length);
    }
    length = chunkString(2, length)
        .reverse()
        .join('');
    header += rightPad(8, length);

    return header + byteArrayToHexString(packed);
};

const toHex = (element, model) => {
    const canvas = getCanvas();
    const ctx = canvas.getContext('2d');
    if (ctx == null) {
        throw new Error('2D context is null');
    }
    ctx.clearRect(0, 0, getWidth(model), getHeight(model));
    ctx.drawImage(element, 0, 0);

    const imageData = ctx.getImageData(0, 0, getWidth(model), getHeight(model));

    const w = getWidth(model);
    const h = getHeight(model);

    if (model === 2) {
        return toif(w, h, imageData);
    }
    return toig(w, h, imageData);
};

const fileToDataUrl = (file: File) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = e => {
            resolve(e.target.result);
        };
        reader.onerror = err => {
            reject(err);
        };
        reader.readAsDataURL(file);
    });
};

const dataUrlToImage = (dataUrl: string) => {
    const image = new Image();
    return new Promise((resolve, reject) => {
        image.onload = () => {
            resolve(image);
        };
        image.onerror = e => {
            reject(e);
        };
        image.src = dataUrl;
    });
};

const checkImage = (origImage: Image, model) => {
    const height = getHeight(model);
    const width = getWidth(model);
    if (origImage.height !== height) {
        throw new Error('Not a correct height.');
    }
    if (origImage.width !== width) {
        throw new Error('Not a correct width.');
    }

    const canvas: HTMLCanvasElement = getCanvas();
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (ctx == null) {
        throw new Error('2D context is null');
    }
    ctx.drawImage(origImage, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);

    if (model === 1) {
        range(imageData.height).forEach(j => {
            range(imageData.width).forEach(i => {
                const index = j * 4 * imageData.width + i * 4;
                const red = imageData.data[index];
                const green = imageData.data[index + 1];
                const blue = imageData.data[index + 2];
                const alpha = imageData.data[index + 3];
                if (alpha !== 255) {
                    throw new Error('Unexpected alpha.');
                }
                let good = false;
                if (red === 0 && green === 0 && blue === 0) {
                    good = true;
                }
                if (red === 255 && green === 255 && blue === 255) {
                    good = true;
                }
                if (!good) {
                    throw new Error(`wrong color combination ${red} ${green} ${blue}.`);
                }
            });
        });
    }
    return canvas.toDataURL('image/png');
};

const check = (file, model) => {
    return fileToDataUrl(file)
        .then(url => dataUrlToImage(url))
        .then(image => checkImage(image, model));
};

export default toHex;
