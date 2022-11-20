const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const ret = []
let base = 3
for (let i = 0; i < arr.length; i++) {
    if (i % base != 0) {
        ret.push(arr[i])
    }
}
console.log(ret)