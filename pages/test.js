import { useEffect, useState } from "react";

export default function Test() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/test")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Erreur fetch :", err));
  }, []);

  if (!data) return <p>Loading...</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
