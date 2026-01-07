const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const hamButton = document.querySelector("#ham-btn");
const crossButton = document.querySelector("#cross-btn");
const navigation = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");
const showCourses = document.querySelector("#show-courses");
const allCourses = document.querySelector("#all-courses")
const cseCourses = document.querySelector("#cse-courses")
const wddCourses = document.querySelector("#wdd-courses")
const courseCredits = document.querySelector("#credits")
const footerPara = document.querySelector("#footer-para")
const date = new Date();
const showYear = document.querySelector("#date")
const lastModified = document.querySelector("#last-modified")


showYear.textContent = date.getFullYear()
lastModified.textContent = `Last Modified: ${date.toLocaleString()}`


hamButton.addEventListener("click", ()=>{
  hamButton.classList.add("cross");
  crossButton.classList.remove("cross")
  navigation.classList.add("open")
})
crossButton.addEventListener("click", ()=>{
  hamButton.classList.remove("cross")
  crossButton.classList.add("cross")
  navigation.classList.remove("open")
})

const renderCourses = (courses)=>{
  showCourses.innerHTML = "";
  const fragment = document.createDocumentFragment();
  courses.forEach(course => {
    const courseName = document.createElement("button");
    courseName.classList.add("course-name")
    if (course.completed){
      courseName.textContent = `✓ ${course.subject} ${course.number}`;
      courseName.style.backgroundColor = "#f0edd7"
    }else {
      courseName.textContent = `🔄 ${course.subject} ${course.number}`;
      courseName.style.backgroundColor = "#daff53"
    }
    fragment.appendChild(courseName)
  });
  showCourses.appendChild(fragment);
}

allCourses.addEventListener("click", ()=>{
  courseCredits.innerHTML = "";
  renderCourses(courses)
  const totalCredits = courses.reduce((accum, course)=>{
    return accum + course.credits
  },0 )
  courseCredits.textContent = `The total credits for the courses above is ${totalCredits}`
})
cseCourses.addEventListener("click", ()=>{
  courseCredits.innerHTML = ""
  const filtered = courses.filter(course=>course.subject === "CSE")
  renderCourses(filtered)

  const totalCredits = filtered.reduce((accum, course)=>{
    return accum + course.credits
  }, 0)
  courseCredits.textContent = `The total credits for the courses above is ${totalCredits}`

})
wddCourses.addEventListener("click", ()=>{
  courseCredits.innerHTML = ""
  const filtered = courses.filter(course=>course.subject === "WDD")

  renderCourses(filtered)
  const totalCredits = filtered.reduce((accum, course)=>{
    return accum + course.credits
  }, 0)
  courseCredits.textContent = `The total credits for the courses above is ${totalCredits}`


})
