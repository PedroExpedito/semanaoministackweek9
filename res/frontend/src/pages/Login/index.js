import React, { useState } from "react"
import api from "../../services/api";
import logo from "../../assets/logo.png";
export default function Login({ history }) {
    const [email, setEmail] = useState("");

    async function handSubmit(event){
        event.preventDefault()
        const response = await api.post("/sessions", { email });
            
        const { _id } = response.data;
    
        localStorage.setItem("user", _id);
        history.push("./dashboard")
    }
    return (
        <>
        <img src={logo} alt="aircnc"></img>
        <p>Fazendo um teste em react e <strong>estou</strong> gostando muito</p>
        <form onSubmit={handSubmit}>
          <label htmlFor="email">E-MAIL*</label>
          <input 
          type="email" 
          id="email" 
          placeholder="Seu Email"
          value={email} 
          onChange={event => setEmail(event.target.value)}
          />
          <button className="btn" type="submit">Entrar</button>
        </form>
        </>
    )
}