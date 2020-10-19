import React from 'react'; // подключение библиотеки React
import {News} from './components/News';
import {Add} from './components/Add';
import './App.css'; // подключение файла стилей

// далее скопировано из тэга script

class App extends React.Component {
  state = {
    news: null,
    isLoading:false
  }

  static getDerivedStateFromProps(props, state){
    if(Array.isArray(state.news)){
        let nextFilteredNews = [...state.news]

        nextFilteredNews.forEach((item, index) => {
        if (item.bigText.toLowerCase().includes('pubg')) {
          item.bigText = 'СПАМ'
        }
      })
      return {
        filteredNews: nextFilteredNews,
      }
    }
  return null
}

  componentDidMount() {
    this.setState({isLoading:true})
     fetch('http://localhost:3000/data/newsData.json')
       .then(response => {
         return response.json()
       })
       .then(data => {
         setTimeout(()=>{
            this.setState({news:data, isLoading:false})
         }, 3000)
       })
   }
  handleAddNews = data => {
    const nextNews = [data, ...this.state.news];
    this.setState({ news: nextNews });
  };
  render() {
    const {news, isLoading} = this.state;
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    );
  }
}

// скопировано все кроме ReactDOM.render

// добавился export
export default App;
