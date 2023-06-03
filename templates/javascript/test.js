const yargsParser = require("yargs-parser")
const signale = require("signale")
const chalk = require("chalk")
chalk.level = 1

// Notify update when process exits
// 程序退出时通知
const updater = require('update-notifier');
const pkg = require('./package.json');
updater({ pkg }).notify({ defer: true });

let args = process.argv.slice(2)
console.log("args", args)

const parsedArgs = yargsParser(args)
console.log("parsedArgs", parsedArgs)

console.log("process.cwd", process.cwd())
console.log("__dirname", __dirname)
console.log("__filename", __filename)

// signale 优雅的控制台日志输出工具
signale.error(new Error(`Cannot specify file when have multiple entries`))

// chalk 改变输出颜色
console.log(chalk.blue("local"))
console.log(chalk.cyan("local"))

console.log(chalk.red("你是猪"))
console.log(chalk.green("你是猪"))
console.log(chalk.yellow("小仙女"))
console.log(chalk.yellow.bgGreen("你好啊李银河"))
console.log(chalk.yellow.bgWhiteBright("你好啊李银河"))

console.log(chalk.underline.bgBlue("world"))
console.log(
  chalk.green(
    "I am a green line " +
      chalk.blue.underline.bold("with a blue substring") +
      " that becomes green again!"
  )
)

const error = chalk.bold.red
const warning = chalk.hex("#FFA500") // Orange color

console.log(error("Error!"))
console.log(warning("Warning!"))




