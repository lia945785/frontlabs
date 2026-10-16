const directions = [
    { id: 10, name: "Клієнтські обчислення", department: "Клієнтський відділ", government: "BIS, FTC", readers1: 520, readers2: 480, duration: 24 },
    { id: 20, name: "Центри обробки даних і ШІ", department: "Серверний відділ", government: "DOE, BIS", readers1: 410, readers2: 450, duration: 36 },
    { id: 30, name: "Мережі та периферійні обчислення", department: "Серверний відділ", government: "FCC, NIST", readers1: 300, readers2: 260, duration: 24 },
    { id: 40, name: "Контрактне виробництво", department: "Виробничий відділ", government: "Мінторг США", readers1: 350, readers2: 390, duration: 60 },
    { id: 50, name: "Програмовані логічні схеми", department: "Серверний відділ", government: "BIS, NIST", readers1: 180, readers2: 150, duration: 12 },
    { id: 60, name: "Системи допомоги водієві", department: "Автомобільний відділ", government: "NHTSA", readers1: 270, readers2: 310, duration: 36 },
    { id: 70, name: "Графічні процесори", department: "Клієнтський відділ", government: "BIS", readers1: 330, readers2: 290, duration: 12 },
    { id: 80, name: "Дослідження і розробки", department: "Дослідницький відділ", government: "NSF, DARPA", readers1: 150, readers2: 170, duration: 60 },
    { id: 90, name: "Програмне забезпечення", department: "Серверний відділ", government: "NIST", readers1: 200, readers2: 120, duration: 24 },
    { id: 100, name: "Кібербезпека", department: "Клієнтський відділ", government: "CISA", readers1: 240, readers2: 260, duration: 12 }
];
function sortByDuration(list) {
    return [...list].sort((a, b) => a.duration - b.duration);
}
function getAverageReaders(list, duration) {
    const group = list.filter(d => d.duration === duration);
    const sum = group.reduce((total, d) => total + d.readers1 + d.readers2, 0);
    return sum / (group.length * 2);
}
console.log("1. Напрями, впорядковані за тривалістю послуги (місяців)");
const sorted = sortByDuration(directions);
for (const d of sorted) {
    console.log(`${d.duration} - ${d.name}`);
}
for (const duration of new Set(sorted.map(d => d.duration))) {
    console.log(`Тривалість ${duration}: в середньому ${getAverageReaders(directions, duration).toFixed(1)} читачів за добу`);
}
function findMinReaders2(list) {
    let min = list[0];
    for (const d of list) {
        if (d.readers2 < min.readers2) {
            min = d;
        }
    }
    return min;
}
console.log("2. Напрям з мінімальною кількістю читачів за добу_2");
const min = findMinReaders2(directions);
console.log(`${min.name} (${min.readers2}) - ${min.department}`);
function isFull(direction) {
    const fields = ["id", "name", "department", "government", "readers1", "readers2", "duration"];
    return fields.every(field => direction[field] !== undefined && direction[field] !== "");
}
function addDirection(list, direction) {
    if (!isFull(direction)) {
        list.push(direction);
        return;
    }
    const index = list.findIndex(d => d.id > direction.id);
    if (index === -1) {
        list.push(direction);
    } else {
        list.splice(index, 0, direction);
    }
}
console.log("3. Додавання нових напрямів");
addDirection(directions, { id: 45, name: "Квантові обчислення", department: "Дослідницький відділ", government: "NSF", readers1: 90, readers2: 110, duration: 48 });
console.log(`Уся інфо є (id 45): ${directions.map(d => d.id).join(", ")}`);
addDirection(directions, { id: 5, name: "Освітні програми", department: "Дослідницький відділ", readers1: 60, readers2: 70, duration: 6 });
console.log(`Немає інфо (id 5): ${directions.map(d => d.id).join(", ")}`);
function getDepartmentDuration(list, department) {
    const services = list.filter(d => d.department === department);
    const k = services.length <= 3 ? 0.95 : 0.6;
    const total = services.reduce((sum, d) => sum + d.duration * k, 0);
    return `${department}: послуг ${services.length}, тривалість ${total.toFixed(1)} місяців`;
}
console.log("4. Тривалість надання послуг відділом");
console.log(getDepartmentDuration(directions, "Виробничий відділ"));
console.log(getDepartmentDuration(directions, "Клієнтський відділ"));
console.log(getDepartmentDuration(directions, "Серверний відділ"));