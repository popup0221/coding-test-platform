module.exports = (source) => {
  return {
    entry: {
      main: source
    },
    output: {
      filename: 'bundle.js',
      libraryTarget: 'var',
      library: 'MyLibrary'
    },
    // 추가적인 webpack 설정은 필요에 따라 추가 가능
  };
};
