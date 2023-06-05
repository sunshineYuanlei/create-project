import chalk from "chalk"
import fs from "fs"
import ncp from "ncp"
import path from "path"
import { promisify } from "util"
import execa from "execa"
import Listr from "listr"
import { projectInstall } from "pkg-install"

const download = require("download-git-repo")

// 访问文件
const access = promisify(fs.access)
// 跨平台递归拷贝文件
const copy = promisify(ncp)

// 拷贝模板（递归拷贝文件）
// 注意点
async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  })
}

function downloadTemplate(options) {
  console.log('options>>>', options)
  return new Promise((resolve, reject) => {
    const APP_TYPE_REPOSITORY_MAP = {
      webpack: "alienzhou/webpack-kickoff-template",
      rollup: "alienzhou/rollup-kickoff-template",
    }
    const template = APP_TYPE_REPOSITORY_MAP[options.template]
    download(template, options.targetDirectory, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

// 从远程模板仓库下载模板
async function downloadTemplateFiles(options) {
  return await downloadTemplate(options)
}

// 初始化 git
async function initGit(options) {
  // 执行 git init
  const result = await execa("git", ["init"], {
    // 在选项中指定的目录中进行git初始化
    cwd: options.targetDirectory,
  })
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"))
  }
  // return true
  return
}

// 创建项目
export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  }

  console.log("process.cwd>>>", process.cwd())
  //  通过import.meta.url获取当前模块/main.js的url(import.meta中含有当前模块的所有内置信息)
  const currentFileUrl = import.meta.url
  console.log("currentFileUrl>>>", currentFileUrl)
  const newUrl = new URL(currentFileUrl)
  console.log("newUrl>>>", newUrl, path.resolve(__dirname))

  const templateDir = path.resolve(
    __dirname, // newUrl.pathname
    "../templates",
    options.template.toLowerCase()
  )
  options.templateDirectory = templateDir
  console.log("templateDir>>>", templateDir)
  
  // 如果从本地下载模板, 检查模板是否存在
  if (!options.isRemote) {
    try {
      // 判断模板是否存在
      // fs.constants.R_OK -- 文件可被调用进程读取
      await access(templateDir, fs.constants.R_OK)
    } catch (err) {
      // 模板不存在
      console.error("%s Invalid template name", chalk.red.bold("ERROR"))
      console.log("err>>>", err)
      //  node.js中使用process.exit(integer)来中断进程, integer非0
      process.exit(1)
    }
  }

  // 声明 tasks
  const tasks = new Listr([
    {
      title: "Copy project files",
      // 拷贝模板, 根据options.isRemote参数选择从本地下载模板或者从远程模板仓库下载模板
      task: () =>
        !options.isRemote
          ? copyTemplateFiles(options)
          : downloadTemplateFiles(options),
    },
    {
      title: "Initialize git",
      // 初始化git
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: "Install dependencies",
      task: () =>
        // 编程式安装依赖
        projectInstall({
          cwd: options.targetDirectory,
        }),
      // 手动安装依赖
      skip: () =>
        !options.runInstall
          ? "Pass --install to automatically install dependencies"
          : undefined,
    },
  ])

  // 并行执行 tasks
  await tasks.run()

  console.log("%s Project ready", chalk.green.bold("DONE"))
  return true
}
