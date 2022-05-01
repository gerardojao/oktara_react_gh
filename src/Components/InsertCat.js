import {useState} from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import {useNavigate} from "react-router-dom"
import api from "../Util/api"

const InsertCat = () => {

    const [data, setData] = useState([])
    const [modalInsert, setModalInsert] = useState(true)
    const [userSelected, setuserSelected] = useState({
        id: "",
        name: "",
        breed: "",
        description: ""
  })
  const navigate = useNavigate()
  const abrirCerrarModal = () => {
    setModalInsert(!modalInsert)
    navigate("/")
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setuserSelected({
      ...userSelected,
      [name]: value
    })

  }
 
  const peticionPost = async () => {
    userSelected.id = parseInt(userSelected.id)
    await api.post("/cats",userSelected)
      .then(res => {
        setData(data.concat(res.data))
        abrirCerrarModal();
      }).catch(err => {
        console.log(err);
      })
  }
  return (
    <Modal isOpen={modalInsert}>
    <ModalHeader>Insert New Cat</ModalHeader>
    <ModalBody>
      <div className="form-group">
        <label >Name:</label>
        <br />
        <input onChange={handleChange} name="name" type="text" className="form-control" />
        <br />
        <label >Breed:</label>
        <br />
        <input onChange={handleChange} name="breed" type="text" className="form-control" />
        <br />
        <label >Description:</label>
        <br />
        <input onChange={handleChange} name="description" type="text" className="form-control" />
        <br />
        <br />
      </div>
    </ModalBody>
    <ModalFooter>
      <button onClick={() => peticionPost()} className="btn btn-primary">Insert</button>
      <button onClick={() => abrirCerrarModal()} className="btn btn-danger">Cancel</button>
    </ModalFooter>
  </Modal>
  )
}

export default InsertCat