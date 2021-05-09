export const ListItem = ({
  firstName,
  lastName,
  position,
  city,
  division,
  teamFullName
}) => {
  return (
    <div className="table--wrapper">
      <table>
        <thead>
          <tr>
            <th>
              {firstName}
            </th>
            <th>
              {lastName}
            </th>
            <th>
              {division}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  )
}