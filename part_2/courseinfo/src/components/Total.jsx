export default function Total(props) {
  const exercises = props.parts.map(part => part.exercises)
  const total = exercises.reduce((a,b) => a + b, 0)
  return (
    <p><b>total of {total} exercises </b></p>
  )
}