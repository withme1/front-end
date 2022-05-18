let list = [20, 30, 50, 100, 250];

for (let a = 500; a <= 128000; a *= 2)
    list.push(a);


//m to level
export const getLevelByDisance = (d) => {
    return list.findIndex(v => v > d/4) + 1;
}