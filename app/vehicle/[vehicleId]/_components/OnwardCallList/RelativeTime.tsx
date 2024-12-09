const getRelativeMinutes = (
  scheduledTime: Date,
  expectedTime: Date,
): number => {
  return Math.round(
    Math.ceil((expectedTime.getTime() - scheduledTime.getTime()) / 1000 / 60),
  )
}

const RelativeTime = ({
  scheduled,
  expected,
}: {
  scheduled: Date
  expected: Date
}) => {
  const minutesDifference = getRelativeMinutes(scheduled, expected)
  if (minutesDifference === 0) return <span>on time</span>

  const absoluteDifference = Math.abs(minutesDifference)
  const isEarly = minutesDifference < 0
  return (
    <span
      style={{
        color: isEarly ? 'green' : 'red',
      }}
    >
      {absoluteDifference} {absoluteDifference === 1 ? 'minute' : 'minutes'}{' '}
      {isEarly ? 'early' : 'late'}
    </span>
  )
}

export default RelativeTime
