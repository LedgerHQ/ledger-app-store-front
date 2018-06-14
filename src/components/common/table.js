// @flow
import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'

import Delete from 'material-ui-icons/Delete'
import Edit from 'material-ui-icons/ModeEdit'

type Props = {
  items: Object[],
  openEditModal: Function,
  openDeleteModal: Function,
}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 14,
  },
}))(TableCell)

class TableCreator extends React.Component<Props> {
  props: Props

  renderTableHeader = (item: Object): React.Node => (
    <React.Fragment>
      <CustomTableCell>delete</CustomTableCell>
      <CustomTableCell>update</CustomTableCell>
      {Object.keys(item).map(key => <CustomTableCell key={key}>{key}</CustomTableCell>)}
    </React.Fragment>
  )

  renderTableRows = (items: Object[]): React.Node =>
    items.map(item => (
      <TableRow key={item.id}>
        <TableCell>
          <IconButton onClick={this.props.openDeleteModal(item)}>
            <Delete />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={this.props.openEditModal(item)}>
            <Edit />
          </IconButton>
        </TableCell>

        {Object.keys(item).map(
          key =>
            Array.isArray(item[key]) ? (
              <TableCell key={key}>
                {item[key].map((el, i, arr) => (i === arr.length - 1 ? el.id : `${el.id}, `))}
              </TableCell>
            ) : (
              <TableCell key={key}>{item[key]}</TableCell>
            ),
        )}
      </TableRow>
    ))

  render(): React.Node {
    const { items } = this.props
    const first = items && items.length > 0 ? items[0] : {}
    return items.length > 0 ? (
      <div>
        <Table>
          <TableHead>
            <TableRow>{this.renderTableHeader(first)}</TableRow>
          </TableHead>
          <TableBody>{this.renderTableRows(items)}</TableBody>
        </Table>

        <style jsx>{`
          div {
            overflow-x: scroll;
          }
        `}</style>
      </div>
    ) : null
  }
}

export default TableCreator
