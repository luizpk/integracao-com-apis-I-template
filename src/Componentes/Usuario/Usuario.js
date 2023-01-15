import axios from "axios"
import { useEffect, useState } from "react"

 const Usuario =(props)=>{

    const [usuario, setUsuario] = useState({})
    const [nome, setNome] = useState("")
    const [email,setEmail] = useState("")
    const [editar, setEditar] = useState(false)



    const pegarUsuarioPeloId = () =>{
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`,
        {
            headers: {
                Authorization : "luiz-pinheiro-ammal"
            }
        })
        .then((resposta)=>{
            console.log(resposta.data)
            setUsuario(resposta.data)

        })
        .catch((erro)=>{
            console.log("erro")
        })
    }

    useEffect(()=>{
        pegarUsuarioPeloId()
    },[])

    const editarUsuario = ()=>{

        const body = {
          name: nome,
          email: email
        }
      
      axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, body, {
        headers: {
          Authorization: "luiz-pinheiro-ammal"
        }
      })
      .then((resposta)=>{
        alert("Usuário atualizado com sucesso.")
        pegarUsuarioPeloId()
        setEditar(!editar)
    })
      .catch((erro)=>{
        console.log(erro.response.data.message)
      })
      
      }

    return(
        <>

        {editar?
        <div> <input placeholder="nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
        <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <button onClick={editarUsuario}>Alterar usuário</button></div>:<div><p>{usuario.name}</p>
            <p>{usuario.email}</p></div>
        
        }

        <button onClick={()=>setEditar(!editar)}>Editar</button>

       

       

            
        </>
    )
}

export default Usuario;
