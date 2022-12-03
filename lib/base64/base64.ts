const { atob } = globalThis;


export const base64abc = [
  "A","B","C","D","E","F","G",
  "H","I","J","K","L","M","N",
  "O","P","Q","R","S","T","U",
  "V","W","X","Y","Z","a","b",
  "c","d","e","f","g","h","i",
  "j","k","l","m","n","o","p",
  "q","r","s","t","u","v","w",
  "x","y","z","0","1","2","3",
  "4","5","6","7","8","9","+",
  "/"
];

export function bytesToBase64(bytes: Uint8Array) {
  let result = "";
  let i;
  const l = bytes.length;
  for (i = 2; i < l; i += 3) {
      result += base64abc[bytes[i - 2] >> 2];
      result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
      result += base64abc[((bytes[i - 1] & 0x0f) << 2) | (bytes[i] >> 6)];
      result += base64abc[bytes[i] & 0x3f];
  }
  if (i === l + 1) {
      // 1 octet missing
      result += base64abc[bytes[i - 2] >> 2];
      result += base64abc[(bytes[i - 2] & 0x03) << 4];
      result += "==";
  }
  if (i === l) {
      // 2 octets missing
      result += base64abc[bytes[i - 2] >> 2];
      result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
      result += base64abc[(bytes[i - 1] & 0x0f) << 2];
      result += "=";
  }
  return result;
}

export function base64ToBytes(base64: string) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
