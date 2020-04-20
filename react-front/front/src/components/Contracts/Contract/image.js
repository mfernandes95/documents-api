import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Image, Download, Wrappers } from './styles';
import api from '../../../services/api';

export default function Imagem() {
  const [image, setImage] = useState();
  const [nameFile, setNameFile] = useState();
  const { contract_id, id } = useParams();

  useEffect(() => {
    async function loadImage() {
      const response = await api.get(`/contracts/${contract_id}/files/${id}`)
      console.log(response.data)
      setImage(response.data.message)
      setNameFile(response.data.file.name)
    }

    loadImage()
  }, [contract_id, id])

  return (
    <Wrappers>
      <Image>
        <img src={"data:image/png;base64," + image}
          alt="imagem" />
      </Image>
      <Download>
        <a
          href={"data:image/png;base64," + image}
          download={nameFile}>
          <button type="button">Download</button>
        </a>
        <Link to={`/contract/${contract_id}`}>
          <button type="button">Voltar</button>
        </Link>
      </Download>
    </Wrappers>
  )
}
