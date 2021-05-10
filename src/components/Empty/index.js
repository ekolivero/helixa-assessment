import { Empty as NoData } from "antd"

export const Empty = () => {
  return (
    <div className="container__detail">
      <NoData
        description="Press on your favourite player to see his stats" 
      />
    </div>
  )
}

export default Empty;