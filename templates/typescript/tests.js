var fs = require('fs'); // 引入fs模块

  

// 写入文件内容（如果文件不存在会创建一个文件）

// 传递了追加参数 { 'flag': 'a' }

fs.writeFile('./try4.txt', 'HelloWorld', { 'flag': 'a' }, function(err) {

    if (err) {

        throw err;

    }

  

    console.log('Hello.');

  

    // 写入成功后读取测试

    // fs.readFile('./try4.txt', 'utf-8', function(err, data) {

    //     if (err) {

    //         throw err;

    //     }

    //     console.log(data);

    // });

});