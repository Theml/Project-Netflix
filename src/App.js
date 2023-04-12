import React, { useEffect,useState } from "react";
import MovieRow from './Components/movieRow/MovieRow';
import Tmdb from './Tmdb';
import './App.css';
import FeaturedMovie from './Components/featureMovie/FeaturedMovie';
import Header from './Components/header/Header';

function App() {

  const [moveList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState (null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () =>{

      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.find(i=>i.slug === 'Originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0]?.items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=> {
    const scrollListener = () => {
      if(window.scrollY > 10 ) {
        setBlackHeader(true);
      }else {
          setBlackHeader(false);
        }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  })

  return (
    <div className="page">

      <Header black={blackHeader} />

    { featuredData &&
      <FeaturedMovie item={featuredData}/>
    }

      <section className="lists">
        {moveList.map((item, key)=>(
        <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
      
      <footer>
        Feito por Luis Gustavo Theml Novais <br/>
        Direitos de imagem Netflix e AmongUS <br/>
        Dados pegos do site Themoviedb.org
      </footer>

      {setMovieList.length <= 0 && 
      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando" />
      </div>
      }
    </div>
  );
}

export default App