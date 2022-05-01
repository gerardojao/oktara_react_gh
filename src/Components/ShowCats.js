import React, {useState, useEffect} from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import Loader from "../Util/Loader"
import {Link} from "react-router-dom"
import api from "../Util/api"

const ShowCats = () => {
  
  
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalDelete, setModalDelete] = useState(false)
    const [userSelected, setuserSelected] = useState({
      id: "",
      name: "",
      breed: "",
      description: ""
})
    

    const peticionGet = async () => {
       const res = await api.get("/cats")
       setData(res.data)
       setLoading(false)
    }

    const peticionDelete = async () => {
     
      await api.delete("/cats/" + userSelected.id)
        .then(res => {
         setData(data.filter(elem=>elem.id !== res.data));
         abrirCerrarModalDelete();
        }).catch(err => {
          console.log(err);
        })
    }

      const abrirCerrarModalDelete = () => {
        setModalDelete(!modalDelete)
      }
    
      useEffect(() => {
        peticionGet();
     
      }, [])
      useEffect(() => {
        peticionGet();
     
      }, [data])
    

      const abrirCerrarModalEdit =()=>{setModalDelete(!modalDelete)}

      const selectUser  = (user, caso) => {
        setuserSelected(user);
        (caso ==="Edit") 
        ? abrirCerrarModalEdit()
        : abrirCerrarModalDelete()
      }
    
    
    
  return (
      <> 
        <Link to={`/create`} className="btn btn-success mt-4 mb-4">Insert New Cat <i className="fa-solid fa-cat"></i> </Link>    
          {loading 
          ? <Loader /> 
          : <table className="table table-bordered">
                <thead >
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>BREED</th>
                  <th>DESCRIPTION</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
              
                {data.map(cat =>(
                  <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.breed}</td>
                    <td>{cat.description}</td>
                    <td>
                      <Link to={`/edit/${cat.id}`} className="btn btn-primary mr-5"  onClick={()=>selectUser(cat,"Edit")}>Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                    
                      <button
                        className="btn btn-danger ml-5"
                        onClick={()=>selectUser(cat,"Delete")}
                        >
                        Eliminar <i className="fa-solid fa-circle-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
          
              </tbody>
            </table>
          }
            <Modal isOpen={modalDelete}>
              <ModalHeader>Delete Cat</ModalHeader>
              <ModalBody>
              ¿Do you wish to delete to {userSelected && userSelected.name}
              </ModalBody>
              <ModalFooter>
                <button onClick={() => peticionDelete()} className="btn btn-danger ">Yes</button>
                <button onClick={() => abrirCerrarModalDelete()} className="btn btn-secundary">No</button>
              </ModalFooter>
            </Modal>
            </> 
        )
      }

export default ShowCats