import React, { useState, useEffect } from "react";
import axios from "axios";
import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import FilmListesi from "./Filmler/FilmListesi";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Film from "./Filmler/Film";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın +
        .then((response) => {
          console.log("Statik linkten gelen veri: ", response.data);
          setMovieList(response.data);
          setLoading(false);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
          setErrorMsg(true);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <div>
      <KaydedilenlerListesi
        list={
          [
            /* Burası esnek */
          ]
        }
      />
      {errorMsg && <h1>Network Hatası</h1>}
      {loading && <p>Yükleniyor...</p>}
      <Switch>
        <Route path="/" exact>
          Anasayfadasınız {!loading && <FilmListesi movieList={movieList} />}
        </Route>
        <Route path="/filmler/:id">
          <Film />
        </Route>
        <Route path="/filmler">
          Filmler Sayfasındasınız <FilmListesi movieList={movieList} />
        </Route>
      </Switch>
    </div>
  );
}
