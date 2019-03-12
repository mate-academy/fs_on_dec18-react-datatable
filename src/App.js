import React from 'react';

import './App.css';
import Datatable from './components/Datatable';

const peopleColumnConfig = {
  name: {
    title: 'Имя', // в таблице колонка будет так называться
    isSortable: true, // Поиск будет проверять эту и последнюю колонки
    isSearchable: true,
    link: '/person/:name'
  },
  born: {
    title: 'Год рождения',
    isSortable: true, // по этой колонке можно сортировать
  },
  sex: { // Только для тех ключей которые есть в columnConfig будут колонки в таблице
    title: 'Пол',
  }
};

class App extends React.Component {
  state = {
    people: [],
    config: peopleColumnConfig,
  };

  async componentDidMount() {
    const response = await fetch('https://mate-academy.github.io/fe-program/js/tasks/people/people.json');
    const people = await response.json();

    this.setState({ people });
  }

  render () {
    const { people, config } = this.state;

    return (
      <div className="App">
        <h1>Datatable</h1>
        <Datatable
          items={people}
          config={config}
        />
      </div>
    );
  }
}

export default App;
