// @flow
import * as React from 'react'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Title from '../common/title'

const Dashboard = () => (
  <React.Fragment>
    <Title>Dashboard</Title>
    <div className="fab">
      <Button variant="fab" color="secondary">
        <AddIcon />
      </Button>
    </div>

    <style jsx>{`
      .fab {
        position: fixed;
        bottom: 60px;
        right: 60px;
      }
    `}</style>
  </React.Fragment>
)

export default Dashboard
