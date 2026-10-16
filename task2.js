class User {
    constructor(surname, name, age, education, purpose, date, time) {
        this.surname = surname;
        this.name = name;
        this.age = age;
        this.education = education;
        this.purpose = purpose;
        this.date = date;
        this.time = time;
    }
    getDateTime() {
        return new Date(`${this.date}T${this.time}`);
    }
    isWorkTime() {
        return this.time >= "09:00" && this.time < "17:00";
    }
    getGroup() {
        if (this.age >= 45 && this.age < 60 && this.isWorkTime()) {
            return "середній за віком, зі зверненням у робочий час";
        }
        if (this.age >= 60 && !this.isWorkTime()) {
            return "похилого віку зі зверненням у неробочий час";
        }
        return "інші";
    }
}
class UserList {
    constructor(users) {
        this.users = users;
    }
    getByMonth(month, moment) {
        return this.users.filter(u => u.getDateTime().getMonth() + 1 === month && u.getDateTime() <= moment);
    }
    getAverageAge() {
        const sum = this.users.reduce((total, u) => total + u.age, 0);
        return sum / this.users.length;
    }
    countGroups() {
        const groups = {};
        for (const user of this.users) {
            const group = user.getGroup();
            groups[group] = (groups[group] || 0) + 1;
        }
        return groups;
    }
    sortByName() {
        return [...this.users].sort((a, b) => a.surname.localeCompare(b.surname, "uk") || a.name.localeCompare(b.name, "uk"));
    }
}
const users = new UserList([
    new User("Шевченко", "Олена", 47, "вища", "співпраця", "2026-10-02", "10:15"),
    new User("Коваленко", "Андрій", 63, "професійна", "скарга на порушення права власності", "2026-10-05", "19:40"),
    new User("Бондаренко", "Ірина", 29, "вища", "пропозиція", "2026-09-28", "14:00"),
    new User("Ткаченко", "Михайло", 52, "повна", "наявність помилки", "2026-10-12", "16:30"),
    new User("Мельник", "Оксана", 68, "неповна", "пропозиція", "2026-10-20", "07:50"),
    new User("Кравченко", "Денис", 35, "професійна", "співпраця", "2026-11-03", "11:20"),
    new User("Олійник", "Тетяна", 58, "вища", "скарга на порушення права власності", "2026-10-08", "18:10"),
    new User("Шевчук", "Віктор", 71, "повна", "співпраця", "2026-09-15", "12:00"),
    new User("Поліщук", "Наталія", 45, "вища", "наявність помилки", "2026-10-25", "09:00"),
    new User("Лисенко", "Богдан", 22, "неповна", "пропозиція", "2026-10-14", "21:30")
]);
console.log("1. Користувачі, які звернулись у жовтні до 15 жовтня 2026 року 00:00");
for (const u of users.getByMonth(10, new Date("2026-10-15T00:00"))) {
    console.log(`${u.surname} ${u.name} - ${u.date} ${u.time}`);
}
console.log(`2. Середній вік користувача: ${users.getAverageAge()}`);
console.log("3. Кількість користувачів у класах");
const groups = users.countGroups();
for (const group in groups) {
    console.log(`${group}: ${groups[group]}`);
}
console.log("4. Користувачі в алфавітному порядку");
for (const u of users.sortByName()) {
    console.log(`${u.surname} ${u.name} - ${u.purpose}`);
}