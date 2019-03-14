import React from 'react';

class Datatable extends React.Component {
  state = {
    sortColumn: null,
    sortAsc: true,
  };

  handleHeaderClick = (key) => {
    this.setState((prevState) => ({
      sortColumn: key,
      sortAsc: prevState.sortColumn === key ? !prevState.sortAsc : true,
    }));
  };

  getSortedItems() {
    const { sortColumn, sortAsc } = this.state;
    const { items } = this.props;

    if (!sortColumn) {
      return items;
    }

    const sign = sortAsc ? 1 : -1;
    const sortFn = typeof items[0][sortColumn] === 'number'
      ? (a, b) => sign * (a[sortColumn] - b[sortColumn])
      : (a, b) => sign * a[sortColumn].localeCompare(b[sortColumn])
    ;

    return items.sort(sortFn);
  }

  render() {
    const visibleItems = this.getSortedItems();
    const { config } = this.props;

    return (
      <div className="Datatable">
        <table>
          <thead>
            <tr>
              { Object.entries(config).map(([key, value]) => (
                <th
                  key={key}
                  className={value.isSortable ? 'sortable-column' : ''}
                  onClick={value.isSortable
                    ? () => this.handleHeaderClick(key)
                    : null
                  }
                >
                  {value.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
          {visibleItems.map(item =>
            <tr key={item.name}>
              { Object.keys(config).map(key => (
                <td key={key}>
                  {config[key].render ? config[key].render(item) : item[key]}
                </td>
              ))}
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Datatable;
