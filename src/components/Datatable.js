import React from 'react';

import debounce from 'lodash/debounce';

const Pagination = ({ page, perPage, totalCount, onPageChange }) => {
  const pagesCount = Math.ceil(totalCount / perPage);
  const pages = Array(pagesCount).fill(0).map((_, i) => i + 1);

  return (
    <div>
      {pages.map(p => (
        <button
          key={p}
          style={{ backgroundColor: p === page ? 'yellow' : 'white' }}
          onClick={() => onPageChange(p)}
        >
          { p }
        </button>
      ))}
    </div>
  );
};

class Datatable extends React.Component {
  state = {
    sortColumn: null,
    sortAsc: true,
    perPage: 5,
    page: 1,
    query: '',
    visibleQuery: ''
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

  handlePerPageChange = (event) => {
    this.setState({
      perPage: +event.target.value,
    });
  };

  handlePageChange = (page) => {
    this.setState({ page });
  };

  handleQueryChange = (event) => {
    this.setState({
      visibleQuery: event.target.value,
    });

    this.updateQuery(event.target.value);
  };

  updateQuery = debounce((query) => {
    this.setState({
      query: query,
      page: 1,
    });
  }, 1000);

  render() {
    const { page, perPage, query, visibleQuery } = this.state;

    const start = (page - 1) * perPage;
    const end = start + perPage;

    const queryRegexp = new RegExp(query, 'i');

    const sortedItems = this.getSortedItems();
    const filteredItems = sortedItems
      .filter(person => queryRegexp.test(person.name));

    const visibleItems = filteredItems
      .slice(start, end);

    const { config } = this.props;

    return (
      <div className="Datatable">
        <input
          type="text"
          value={visibleQuery}
          onChange={this.handleQueryChange}
        />

        <select onChange={this.handlePerPageChange} value={this.state.perPage} >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="100">100</option>
        </select>

        <Pagination
          page={page}
          perPage={perPage}
          totalCount={filteredItems.length}
          onPageChange={this.handlePageChange}
        />

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
