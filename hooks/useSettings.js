import { useState, useEffect } from "react";

export default function useSettings() {
  const [config, setConfig] = useState([]);
  const [translate, setTranslate] = useState({});

  useEffect(() => {
    // crear translate en base a config
    // {
    //  name: {
    //      num: x,
    //      df:  y
    // }
  }, [config]);

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
    console.log(data);
    let copy = config;
    for (let i = 0; i < copy.length; i++)
      if (copy[i].id === data.id) copy[i] = data;
    setConfig(copy);
  };

  const removeConf = (id) => {
    setConfig(config.filter((s) => s.id !== id));
  };

  return { config, addConf, updateConf, removeConf };
}
