import Header from './Header'
import Content from './Content'
import Total from './Total'
//Destructuring the props to course lets you directly access the course object so js doesnt throw an error
const Course = ({courses})=>{
    return(
        <div>
            <Header text='Web development curriculum'/>
            {courses.map(course => 
            <>
                <Header key={course.id} text={course.name}/>
                <Content key={course.id} content={course.parts}/>
                <Total key={course.id} parts={course.parts}/>
            </>
            )}
        </div>
    )
}

export default Course