import OnwardCallListItem from './OnwardCallListItem'

const OnwardCallList = ({
  onwardCalls,
}: {
  onwardCalls: Array<OnwardCall>
}) => {
  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        listStyle: 'none',
        gap: '1em',
      }}
    >
      {onwardCalls.map((onwardCall, index) => {
        return (
          <OnwardCallListItem
            key={index}
            onwardCall={onwardCall}
            nextStop={index === 0}
          />
        )
      })}
    </ul>
  )
}

export default OnwardCallList
