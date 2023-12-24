import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Axios from "axios";
import '../css/info.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Info = () => {
  const [infoList, setInfo] = useState([]);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    Axios.get("https://backutn.vercel.app/info")
      .then((response) => {
        if (response.data) {
          const formattedData = response.data.map(item => {
            return {
              ...item,
              fecha: new Date(item.fecha).toISOString().split('T')[0]
            };
          });
          setInfo(formattedData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div className="cartainfo">
      {infoList.map((val) => (
        <Card key={val.id} style={{ width: '23rem', border: '2px solid rgb(98, 200, 166)' }}>
        <Card.Body>
          <Card.Title>Asunto:</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"><span>{val.nombre}</span></Card.Subtitle>
          <Card.Text>
            {val.texto}
          </Card.Text>
          <Card.Link href="#" className="custom-card-link">fecha de carga:</Card.Link>
          <Card.Link href="#" className="custom-card-link">{val.fecha}</Card.Link>
        </Card.Body>
      </Card>
      
      ))}
    </div>
  );
};

export default Info;
