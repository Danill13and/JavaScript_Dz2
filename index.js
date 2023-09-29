const authModule = require('./auth.js');
const student = require('./student.js');
const studentModule = require('./student.js');
// const readLine = require('readline')

// // const rl = readLine.createInterface({
// //     input: process.stdin,
// //     output: process.stdout
// // })

var studentUser
var teacherUser

const main = () => {
    if (!studentUser && !teacherUser){
        console.log('Авторизація: \n1: Я вчитель\n2: Я учень')
        authModule.rl.question('',(select)=>{
            switch(select){
                case '1':
                    authModule.authTeacher((teacher) => {
                        teacherUser = teacher
                        main()
                    })
                    break;
                case '2':
                    authModule.authStudent((student) => {
                        studentUser = student
                        main()
                    })
                    break;
            } 
        })
        
    } else if (teacherUser){
        console.log('You are teacher ')
        console.log(teacherUser.name, teacherUser.surname)
        console.log('Подивитися список учнів: 1\nПоставити оцінку: 2\nПереглянути оцінки учнів: 3')
        authModule.rl.question(' ',(select)=>{
            if (select == 1){
                for (let i = 0; i < studentModule.students.length; i++){
                    console.log(`${i}:`, studentModule.students.at(i).name, studentModule.students.at(i).surname);
                }
                main()
            }
            if(select == 2){
                for (let i = 0; i < studentModule.students.length; i++){
                    console.log(`${i}:`, studentModule.students.at(i).name, studentModule.students.at(i).surname);
                    authModule.rl.question('Введіть номер учня:', (studentId) =>{
                        let studentMarks = studentModule.students.at(parseInt(studentId))

                        authModule.rl.question('Введить урок:', (lesson) => {
                            authModule.rl.question('Введить оцінку:', (newMarks) =>{
                                studentMarks.marks[lesson].push(newMarks)
                                main()
                            })
                        })
                    })
                }
            }
            
            if (select == 3){
                for (let i = 0; i < studentModule.students.length; i++){
                    console.log(`${i}:`, studentModule.students.at(i).name, studentModule.students.at(i).surname, studentModule.students.at(i).marks);
                }
                main()
            }
        });
    } else if (studentUser){
        console.log('You are student ')
        console.log(studentUser.name, studentUser.surname)
        authModule.rl.question('Переглянути оцінки 1:',(select) => {
            if(select == 1){
                console.log(studentUser.marks)
            }
            main()
        })
    }
    
}

main()
