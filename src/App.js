import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';
import Datatable from './components/Datatable';

const peopleColumnConfig = {
  checkbox: {
    title: '',
    render: () => (
      <input type="checkbox" />
    )
  },
  name: {
    title: 'Имя', // в таблице колонка будет так называться
    isSortable: true, // Поиск будет проверять эту и последнюю колонки
    isSearchable: true,

    render: (person) => (
      <Link to={`/people/${person.born}`}>{person.name}</Link>
    )
  },
  born: {
    title: 'Год рождения',
    isSortable: true, // по этой колонке можно сортировать
  },
  age: {
    title: 'Возраст',
    render: (person) => person.died - person.born
  },
  sex: { // Только для тех ключей которые есть в columnConfig будут колонки в таблице
    title: 'Пол',
  },
};

class App extends React.Component {
  state = {
    people: [],
    config: peopleColumnConfig,
    isLoaded: false,
  };

  async componentDidMount() {
    const response = await fetch('https://mate-academy.github.io/fe-program/js/tasks/people/people.json');
    const people = await response.json();

    this.setState({
      people,
      isLoaded: true
    });
  }

  render () {
    const { people, config, isLoaded } = this.state;

    return (
      <div className="App">
        <h1>Datatable</h1>
        { isLoaded ? (
          <Datatable
            items={people}
            config={config}
          />
        ) : (
          <p>Loading...</p>
        )}

      </div>
    );
  }
}

export default App;
