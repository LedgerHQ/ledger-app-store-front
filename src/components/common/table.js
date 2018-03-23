// @flow
import * as React from 'react'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

type Props = {
  items: Object[],
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

  renderTableHeader = (item: Object): React.Node =>
    Object.keys(item).map(key => <CustomTableCell key={key}>{key}</CustomTableCell>)

  renderTableRows = (items: Object[]): React.Node =>
    items.map(item => (
      <TableRow key={item.id}>
        {Object.keys(item).map(key => <TableCell key={key}>{item[key]}</TableCell>)}
      </TableRow>
    ))

  render(): React.Node {
    const { items } = this.props
    const first = items[0]
    return (
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
    )
  }
}

export default TableCreator
