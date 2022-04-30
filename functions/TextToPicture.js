const Jimp = require('jimp')
const promisify = require('smart-promisify')
const config = require('../config/config.js');
class TextToPicture {
  static async convert({
    text,
    scheme,
    size = 64,
    color = 'black',
    customFont,
    ext = 'png',
    quality = 60
  }) {
    if (!text) {
      throw new Error('text is required')
    }
    let image;

    if (typeof scheme === 'string') {

      if(scheme === 'dark'){
        image = await Jimp.read(config.scheme_custom.dark);
        color = 'white';
      }else if(scheme === 'blue'){
        image = await Jimp.read(config.scheme_custom.blue);
        color = 'white';
      }else if(scheme === 'pink'){
        image = await Jimp.read(config.scheme_custom.pink);
        color = 'white';
      }else{
        image = await Jimp.read(config.scheme)
      }

    } else {
      image = await Jimp.read(config.scheme)
    }

    let font

    if (customFont) {
      font = customFont
    } else {
      const sizes = [8, 16, 32, 64, 128]
      const colors = ['black', 'white']
      if (!sizes.includes(size)) {
        throw new Error('size must be one of ' + sizes.join(',') + ' or use customFont (url to .fnt file)')
      }
      if (!colors.includes(color)) {
        throw new Error('color must be one of ' + colors.join(',') + ' or use customFont (url to .fnt file)')
      }
      let str = 'FONT_SANS_' + size + '_' + color.toUpperCase()
      font = Jimp[str]
    }

    font = await Jimp.loadFont(font)

    image.print(font, 50, 650, text, 1000, Jimp.ALIGN_FONT_CENTER)

    image.quality(quality)

    return {
      image,
      async getBase64() {
        const getBase64 = promisify(image.getBase64)
        return await getBase64.call(image, 'image/' + ext)
      },
      async getBuffer() {
        const getBuffer = promisify(image.getBuffer)
        return await getBuffer.call(image, 'image/' + ext)
      },
      async write(path) {
        const write = promisify(image.write)
        return await write.call(image, path)
      }
    }
  }

  static get Jimp() {
    return Jimp
  }
}

module.exports = TextToPicture;
