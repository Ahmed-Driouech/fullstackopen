import Header from './Header'
import Content from './Content'
//Destructuring the props to course lets you directly access the course object so js doesnt throw an error
const Course = ({course})=>{
    return(
        <div>
            <Header text={course.name}/>
            <Content content={course.parts}/>
        </div>
    )
}

export default Course