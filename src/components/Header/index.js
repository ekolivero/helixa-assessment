import { Input } from "antd"

const Header = ({ handleChange }) => {
  return (
    <div className="container__header">
      <div className="contianer__header__search">
        <div className="container__header__search--input">
          <Input onChange={handleChange} placeholder="Search your player" />
        </div>
      </div>
    </div>
  )
}

export default Header;