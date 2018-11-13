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

const isObject = (value: *): boolean =>
  value && typeof value === 'object' && value.constructor === Object

const formatArrayValues = (value: *) => (isObject(value) ? value.id : value)

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
  renderTableHeader = (item: Object): React.Node => (
    <React.Fragment>
      <CustomTableCell>delete</CustomTableCell>
      <CustomTableCell>update</CustomTableCell>
      {Object.keys(item).map(key => <CustomTableCell key={key}>{key}</CustomTableCell>)}
    </React.Fragment>
  )

  renderWithIcon = (key: string, item: Object): React.Node => {
    let icon
    if (key === 'picture') {
      icon = item[key]
    }
    return icon ? (
      <TableCell key={key}>
        <img style={{ maxWidth: 40 }} src={icon} alt={item.icon} />
      </TableCell>
    ) : (
      <TableCell key={key}>{item[key]}</TableCell>
    )
  }

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
                {item[key].map(
                  (el, i, arr) =>
                    i === arr.length - 1 ? formatArrayValues(el) : `${formatArrayValues(el)}, `,
                )}
              </TableCell>
            ) : (
              this.renderWithIcon(key, item)
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
