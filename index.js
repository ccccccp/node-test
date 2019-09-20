const minimist = require("minimist")
const path = require("path")
const child = require("child_process")

const argv = minimist(process.argv.slice(2), {
    default: {
        e: 'test'
    }
})
const example = argv.e
const getExecFile = function (example) {
    let progromPath = path.join(__dirname, 'examples')
    if (/.js$/.test(example)) {//js文件
        progromPath = path.join(progromPath, example)
    } else {
        progromPath = path.join(progromPath, example, 'index.js')
    }
    return progromPath
}
const progromPath = getExecFile(example)
console.log(progromPath)
try {
    child.fork(progromPath)
} catch (e) {
    console.error("exec err", e)
}