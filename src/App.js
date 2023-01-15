import React, { useState, useEffect } from "react";
// import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";
import axios from "axios";



function App() {
  const [usuarios, setUsuarios] = useState([])
  const [nome, setNome] = useState("")
  const [email,setEmail] = useState('')


const pegarusuarios = ()=>{

  axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", {
    headers: {
      Authorization: "luiz-pinheiro-ammal"
    }
  })
  .then((resposta)=>{
    console.log(resposta.data)
    setUsuarios(resposta.data)
  })
  .catch((erro)=>{
    console.log("erro")
  })
  
}


useEffect(()=>{
  pegarusuarios()
},[])

const criarUsuario = ()=>{

    const body = {
      name: nome,
      email: email
    }

  axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", body, {
    headers: {
      Authorization: "luiz-pinheiro-ammal"
    }
  })
  .then((resposta)=>{
    alert("Usuário criado com sucesso.")
    pegarusuarios()
    setNome("")
    setEmail("")
  })
  .catch((erro)=>{
    alert("Nome de usuário ou email já cadastrados.")
    console.log(erro.response.data.message)
  })
  
}

 

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
     
     <input placeholder="nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
     <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
     <button onClick={criarUsuario}>Criar Usuário</button>
     
     
     
     
      {/* <AddUsuario /> */}
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} id={usuario.id} />
      })}
    </>
  )
}

export default App;
