const fs = require('fs');
const zlib = require('zlib');

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  return (crc ^ (-1)) >>> 0;
}

function makePng(size, r, g, b) {
  const rowLen = 1 + size * 4;
  const raw = Buffer.alloc(size * rowLen);
  for (let y = 0; y < size; y++) {
    const rowOffset = y * rowLen;
    raw[rowOffset] = 0; // filter none
    for (let x = 0; x < size; x++) {
      const px = rowOffset + 1 + x * 4;
      // Soft rounded rect check
      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.44;
      const dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
      if (dist < radius) {
        raw[px] = r;
        raw[px + 1] = g;
        raw[px + 2] = b;
        raw[px + 3] = 255;
      } else {
        raw[px] = 31;
        raw[px + 1] = 78;
        raw[px + 2] = 121;
        raw[px + 3] = 255;
      }
    }
  }
  const idatData = zlib.deflateSync(raw);

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'binary');
    const toCrc = Buffer.concat([typeBuf, data]);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(toCrc), 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);
  ihdrData.writeUInt32BE(size, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdr = chunk('IHDR', ihdrData);
  const idat = chunk('IDAT', idatData);
  const iend = chunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

fs.writeFileSync('icon-192.png', makePng(192, 45, 110, 168));
fs.writeFileSync('icon-512.png', makePng(512, 45, 110, 168));
console.log('PNG icons created successfully.');
