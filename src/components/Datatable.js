import React from 'react';
import { Link } from 'react-router-dom';


class Datatable extends React.Component {
  state = {
    sortColumn: null,
    sortAsc: true,
  };

  handleHeaderClick = (key) => {
    if (!this.props.config[key].isSortable) {
      return;
    }

    this.setState(({ sortColumn, sortAsc }) => {
      return {
        sortColumn: key,
        sortAsc: sortColumn === key ? !sortAsc : true,
      };
    })
  };

  render() {
    const sign = this.state.sortAsc ? 1 : -1;
    console.log(sign);

    const visibleItems = this.state.sortColumn
      ? this.props.items
          .sort((item1, item2) => {
            const value1 = item1[this.state.sortColumn];
            const value2 = item2[this.state.sortColumn];

            return typeof value1 === 'number'
              ? sign * (value1 - value2)
              : sign * value1.localeCompare(value2);
          })
      : this.props.items;

    const { config } = this.props;

    return (
      <div className="Datatable">
        <table>
          <thead>
          <tr>
            { Object.entries(config).map(([key, value]) => (
              <th
                key={key} className={value.isSortable ? 'sortable-column' : ''}
                onClick={() => this.handleHeaderClick(key)}
              >
                {value.title}
              </th>
            ))}
          </tr>
          </thead>

          <tbody>
          {visibleItems.map(item =>
            <Row key={item.name} item={item} config={config} />
          )}
          </tbody>
        </table>
      </div>
    )
  }
}

const Row = ({ item, config }) => (
  <tr>
    { Object.keys(config).map(key => (
      <Cell
        key={key}
        item={item}
        column={key}
        render={config[key].render}
      />
    ))}
  </tr>
);

const Cell = ({ item, column, render }) => (
  <td>{render ? render(item) : item[column]}</td>
);

export default Datatable;
