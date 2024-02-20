const webpack = require('webpack');
const getWebpackConfig = require('./webpack.config.js');

const bundle = (source) => {
  return new Promise((resolve, reject) => {
    // webpack 설정 정의
    // const webpackConfig = {
    //   entry: { // 번들링할 진입점(entry) 파일 정의
    //     main: source // 입력으로 받은 source를 진입점으로 사용
    //   },
    //   output: { // 번들링된 파일의 출력 설정
    //     filename: 'bundle.js', // 번들링된 파일의 이름 지정
    //     libraryTarget: 'var', // 변수로 번들링된 결과를 받기 위한 설정
    //     library: 'MyLibrary' // 번들링된 결과를 저장할 변수 이름
    //   },
    //   // 추가적인 webpack 설정은 필요에 따라 추가 가능
    // };

	const webpackConfig = getWebpackConfig(source);

    // webpack 실행
    webpack(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.error(err);
        return reject(err || stats.toString());
      }

      // 번들링된 JavaScript 코드를 변수로 받아 resolve에 전달
      const bundledCode = stats.compilation.assets['bundle.js'].source();
      resolve(bundledCode);
    });
  });
};

module.exports = bundle;
