export default function LineThrough({text}) {
  return (
    <div className={'linethrough'}>
      <div className={'line'}></div>
      <div className={'text'}>{text}</div>
      <div className={'line'}></div>
    </div>
  )
}