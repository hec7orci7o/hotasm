import { useState, useEffect, useCallback } from "react";

export default function useSettings() {
  const [config, setConfig] = useState([]);
  const [translator, setTranslator] = useState({});

  useEffect(() => {
    let dictionary = Object.assign(
      {},
      ...config.map((x) => ({
        [x.name]: {
          num: x.num,
          df: x.df,
        },
      }))
    );
    setTranslator(dictionary);
  }, [config, setTranslator]);

  const addConf = () => {
    setConfig([
      ...config,
      {
        id: config.length,
        name: null,
        num: null,
        df: null,
      },
    ]);
  };

  const updateConf = (data) => {
    let copy = config;
    for (let i = 0; i < copy.length; i++)
      if (copy[i].id === data.id) copy[i] = data;
    setConfig(copy);
  };

  const removeConf = (id) => {
    setConfig(config.filter((s) => s.id !== id));
  };

  return { config, translator, addConf, updateConf, removeConf };
}
