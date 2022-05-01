import {useState} from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import {useNavigate, useParams} from "react-router-dom"
import api from "../Util/api"

const EditCat = () => {
  
    const [data, setData] = useState([])
    const [modalEdit, setModalEdit] = useState(true)
    const [userSelected, setUserSelected] = useState({
      
  })
const navigate = useNavigate()
const {id} = useParams()
  const abrirCerrarModalEdit = () => {
    navigate("/")
  }
  const handleChange = e => {
    const { name, value } = e.target;
    setUserSelected({
      ...userSelected,
      [name]: value
    })

  }

  const peticionPut = async () => {
 
    await api.put("/cats/" + id, userSelected)
      .then(res => {
        
        data.map(elem => {
           if (userSelected.id ===id) {
            elem.name = res.data.name;
            elem.breed = res.data.breed;
            elem.description = res.data.description;
          }
          console.log(elem)
        })
      
        abrirCerrarModalEdit();
      }).catch(err => {
        console.log(err);
      })
  }

  return (
     <Modal isOpen={modalEdit}>
        <ModalHeader>Edit Cat</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label >Id:</label>
            <br />
            <input onChange={handleChange} value={userSelected && id} type="text" className="form-control" readOnly />
            <br />
            <label >Name:</label>
            <br />
            <input name="name" onChange={handleChange} value={userSelected && userSelected.name} type="text" className="form-control" />
            <br />
            <label >Breed:</label>
            <br />
            <input name="breed" onChange={handleChange} value={userSelected && userSelected.breed} type="text" className="form-control" />
            <br />
            <label >Description:</label>
            <br />
            <input name="description" onChange={handleChange} value={userSelected && userSelected.description} type="text" className="form-control" />
            <br />
           
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button onClick={() => peticionPut()} className="btn btn-primary">Register Change</button>
          <button onClick={() => abrirCerrarModalEdit()} className="btn btn-danger">Cancel</button>
        </ModalFooter>
      </Modal>
  )
}

export default EditCat