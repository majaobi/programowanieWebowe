const students = [...Array(10)].map((_, i) => ({
    id: i + 1,
    name: `Name${i + 1}`,
    surname: `Surname${i + 1}`,
    email: `email${i + 1}@icloud.com`
}));


//z pomocą filipa

module.exports = students