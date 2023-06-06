import arg from "arg"
import inquirer from "inquirer"
import { createProject } from "./main.js"

// export function cli(args) {
//   console.log("test-your-bin")
//   console.log(args)
// }

// 解析命令行参数为 options
function parseArgumentsIntoOptions(rawArgs) {
  // 使用 arg 进行解析
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "--remote": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
      "-r": "remote",
    },
    {
      argv: rawArgs.slice(2),
    }
  )
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    // 注意点
    template: args._[0],
    runInstall: args["--install"] || false,
    isRemote: args["--remote"] || false,
  }
}

async function promptForMissingOptions(options) {
  // 启用默认模板，根据options.isRemote参数确认默认模板值及启用不同选择项
  const defaultTemplateLocal = "Vite-Vue3-JavaScript"
  const defaultTemplateRomote = "webpack"
  const defaultTemplate = !options.isRemote
    ? defaultTemplateLocal
    : defaultTemplateRomote
  // 使用默认模板则直接返回
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    }
  }
  // 准备交互式问题
  const questions = []
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: !options.isRemote
        ? ["Vite-Vue3-JavaScript", "Vite-Vue3-TypeScript"]
        : ["webpack", "rollup"],
      default: defaultTemplate,
    })
  }
  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: false,
    })
  }
  // 使用 inquirer 进行交互式查询，并获取用户答案选项
  const answers = await inquirer.prompt(questions)
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  }
}

export async function cli(args) {
  // 获取命令行配置选项/options
  let options = parseArgumentsIntoOptions(args)
  // 交互式进一步获取配置选项
  options = await promptForMissingOptions(options)
  // 下载模板
  await createProject(options)
  console.log(options)
}
