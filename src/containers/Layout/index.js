import React from "react"
import { Row, Col, Empty } from "antd"

export const Layout = (props) => {
  const {
    master: Master,
    detail: Detail = () => <Empty />,
    id, 
    ...rest
  } = props

  return (
    <Row className="app">
      <Col md={10}>
        <Master name="Erik" />
      </Col>
      <Col md={14}>
        <Detail />
      </Col>
    </Row> 
  )
}

export default React.memo(Layout)