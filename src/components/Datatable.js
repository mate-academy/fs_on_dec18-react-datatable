import React from 'react';

const Datatable = ({ config, items }) => (
  <div className="Datatable">
    <table>
      <thead>
        <tr>
          { Object.values(config).map((value) => (
            <th className={value.isSortable ? 'sortable-column' : ''}>
              {value.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map(item =>
          <Row item={item}/>
        )}
      </tbody>
    </table>
  </div>
);

const Row = ({ item }) => (
  <tr>

  </tr>
);

const Cell = ({children}) => (
  <td>{children}</td>
);

export default Datatable;
