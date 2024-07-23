const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => (
  <>
        {parts.map(part =>           
        <Part key={part.id} 
        part={part} />        
      )}      
  </>
)


const Course = ({course}) => (
  <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((s, p) => s + p.exercises, 0,)} />
    </div>
)

export default Course