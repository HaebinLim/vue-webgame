const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
//node환경 require , vue환경 import
module.exports = {
    mode : 'development',
    devtool : 'eval', // eval 개발중이라는 뜻 빌드 속도가 빠름
    resolve : {
        extensions: ['.js','.vue'], // 확장자 생략 가능
    },
    entry : {
        app : path.join(__dirname, 'main.js'),
    },
    module : {
        rules :[{
            test : /\.vue$/, // .vue로 끝나는 파일
            use : 'vue-loader', // npm i vue-loader -D vue랑 vue-template-compiler 버전은 같아야 함
        },{
            test : /\.css$/,
            use : [
                'vue-style-loader',
                {
                    loader : 'css-loader',
                    options : {
                        esModule : false,
                    }    
                },
            ]
        }],
    },
    plugins : [
        new VueLoaderPlugin(),
    ],
    output : {
        filename : '[name].js', // name = entry : app -> app.js
        path : path.join(__dirname, 'dist'),
        publicPath: '/dist',
    },
}