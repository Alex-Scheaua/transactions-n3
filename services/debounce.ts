let timer: number
export default (callback: Function, timeout = 300) => {
    clearTimeout(timer)
    timer = setTimeout(callback, timeout)
}
