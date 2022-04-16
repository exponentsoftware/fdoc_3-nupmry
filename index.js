// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const student = ['David', ['HTM', 'CSS', 'JS', 'React'], [98, 85, 90, 95]]
var [name, skills, scores] = student
var [, [], [, , jsScore, reactScore]] = student
console.log(name, skills, scores)
console.log(jsScore, reactScore)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const convertArrayToObject = (array) => {
    const object = []
    array.map((item, index) => {
        var [name, skills, scores] = item
        object[index] = { name, skills, scores }
    })
    return object
}

const students = [
    ['David', ['HTM', 'CSS', 'JS', 'React'], [98, 85, 90, 95]],
    ['John', ['HTM', 'CSS', 'JS', 'React'], [85, 80, 85, 80]]
]

console.log(convertArrayToObject(students))

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var student2 = {
    name: "David",
    age: 25,
    skills: {
        frontEnd: [
            { skill: "HTML", level: 10 },
            { skill: "CSS", level: 8 },
            { skill: "JS", level: 8 },
            { skill: "React", level: 9 },
        ],
        backEnd: [
            { skill: "Node", level: 7 },
            { skill: "GraphQL", level: 8 },
        ],
        dataBase: [{ skill: "MongoDB", level: 7.5 }],
        dataScience: ["Python", "R", "D3.js"],
    },
}

const objectCopier = (object) => { // Deep Copy
    if (typeof object !== 'object') return object
    var newObject = Array.isArray(object) ? [] : {}
    for (var key in object) {
        newObject[key] = objectCopier(object[key])
    }
    return newObject
}
var newStudent = objectCopier(student2)

newStudent.skills.frontEnd.push({ skill: "Bootstrap", level: 8 })
newStudent.skills.backEnd.push({ skill: "Express", level: 9 })
newStudent.skills.dataBase.push({ skill: "SQL", level: 8 })
newStudent.skills.dataScience.push("SQL")

console.log(newStudent.skills.frontEnd)

console.log(Object.keys(newStudent).length)
console.log(Object.values(newStudent).length)
console.log(Object.values(newStudent.skills).length)
console.log(newStudent.hasOwnProperty("graphicDesign") ? "Yes" : "No")
for (var key in newStudent) {
    console.log(key)
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const signUp = (Users, user) => {
    Users.findOne({ email: user.email }, async (error, result) => {
        if (error) throw error;
        if (result) res.send("User already exists");
        if (!result) {
            const newUser = new Users({
                username: user.username,
                email: user.email,
                password: user.password,
                isLoggedIn: false,
            });
            await newUser.save()
            res.send("User Created")
        }
    })
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const signIn = (Users, user) => {
    Users.findOne({ email: user.email }, async (error, result) => {
        if (error) throw error;
        if (result) {
            if (result.password === user.password) {
                result.isLoggedIn = true
                await result.save()
                res.send("User Logged In")
            } else {
                res.send("Wrong Password")
            }
        } else {
            res.send("User Not Found")
        }
    })
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const rateProduct = (Products, rating) => {
    Products.findOne({ name: rating.name }, async (error, result) => {
        if (error) throw error;
        if (result) {
            result.ratings = [...result.ratings, { userId: rating.userId, rate: rating.rate }]
            await result.save()
            res.send("Product Rated")
        } else {
            res.send("Product Not Found")
        }
    })
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const averageRating = (Products, product) => {
    Products.find({ name: product.name }, async (error, result) => {
        if (error) throw error;
        if (result) {
            var sum = 0
            result[0].ratings.map((rating) => {
                sum += rating.rate
            })
            res.send(sum / result[0].ratings.length)
        } else {
            res.send("Product Not Found")
        }
    })
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const likeProduct = (Products, product, user) => {
    Products.findOne({ name: product.name }, async (error, result) => {
        if (error) throw error;
        if (result) {
            !result.likes.includes(user._id) ? result.likes.push(user._id) : result.likes.splice(result.likes.indexOf(user._id), 1)
            await result.save()
            res.send("Done!")
        } else {
            res.send("Product Not Found")
        }
    })
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------