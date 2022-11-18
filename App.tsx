import React, { useRef, useState, useEffect, Suspense } from 'react';
import './style.css';

const ChildEmelent = ({ lanzaalert }) => {
  const [nombre, setNombre] = useState('');

  return (
    <div>
      <p>hola</p>
      <input
        type="text"
        value={nombre}
        onChange={(ev) => {
          setNombre(ev.target.value);
        }}
      />
      <br />
      {nombre}
      <button
        onClick={() => {
          lanzaalert(nombre);
        }}
      >
        BUSCAR
      </button>
    </div>
  );
};

export default function App() {
  const h1Tag = useRef();
  const [search, setSearch] = useState('');
  const [inputdata, setInputData] = useState('Goku');

  useEffect(() => {
    fectData();
  }, [inputdata]);

  const fectData = async () => {
    let response = await (
      await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=ttUCMBjcxlYsPn98nGlTl6o2UYExpEdD&q=${inputdata}&limit=1&offset=0&rating=g&lang=es`
      )
    ).json();

    const { original } = response.data[0].images;
    setSearch(original.url);
  };

  const handleClickalertBoton = (dato) => {
    /*  console.log(h1Tag.current);
    if (h1Tag !== null) {
      h1Tag.current.innerHTML = dato;
    } */

    setInputData(dato);
  };

  return (
    <div>
      <h1 ref={h1Tag}>{inputdata}</h1>
      <ChildEmelent lanzaalert={handleClickalertBoton} />
      <p>Start editing to see some magic happen :)</p>
      <Suspense fallback={<p>Cargando</p>}>
        <img src={search} />
      </Suspense>
      {/* {search.map((search) => {
        return <pre key={search}>{search}</pre>;
      })} */}
    </div>
  );
}
