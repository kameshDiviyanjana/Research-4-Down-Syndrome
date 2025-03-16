export function encodeWAV(audioBuffer) {
  const numOfChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length * numOfChannels * 2 + 44;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);
  const sampleRate = audioBuffer.sampleRate;
  let offset = 0;

  function writeString(str) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
    offset += str.length;
  }

  function writeUint32(data) {
    view.setUint32(offset, data, true);
    offset += 4;
  }

  function writeUint16(data) {
    view.setUint16(offset, data, true);
    offset += 2;
  }

  writeString("RIFF");
  writeUint32(length - 8);
  writeString("WAVE");
  writeString("fmt ");
  writeUint32(16);
  writeUint16(1);
  writeUint16(numOfChannels);
  writeUint32(sampleRate);
  writeUint32(sampleRate * numOfChannels * 2);
  writeUint16(numOfChannels * 2);
  writeUint16(16);
  writeString("data");
  writeUint32(length - offset - 4);

  const audioData = audioBuffer.getChannelData(0);
  for (let i = 0; i < audioData.length; i++, offset += 2) {
    view.setInt16(offset, audioData[i] * 0x7fff, true);
  }

  return new Blob([buffer], { type: "audio/wav" });
}
