import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Curd() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [apiData, setApiData] = useState([]);
    const [edit, setEdit] = useState(true);
    const [card, setCard] = useState(false);


    const [id, setId] = useState(' ');
    const [editName , setEditName] = useState('');
    const [editEmail , setEditEmail] = useState('');


    const edithandler = () => {

        setEdit(false);
        setCard(true);
    }
    const cardhandler = () => {

        setEdit(true);
        setCard(false);
    }

    //post submit data 
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://curd-backend-production.up.railway.app/api/post', { name, email });
            console.log(response.data);
            setName('');
            setEmail('');
            getData();

        } catch (error) {
            console.error(error);
        }
    };

    //get a data 
    const getData = async () => {
        try {
            const responce = await axios.get('http://curd-backend-production.up.railway.app/api/get')
            setApiData(responce.data)
        } catch (err) {
            console.log(err)
        }

    }

    //delete 
    const handleDelete = async (id) => {

        try {
            await axios.delete(`http://curd-backend-production.up.railway.app/api/delete/${id}`);
            getData(); // assuming this function fetches data from the server again
        } catch (error) {
            console.log(error);
        }
    };

    //edit
    const handleEdit = async (event) => {
        event.preventDefault();
        try {
          await axios.put(`http://curd-backend-production.up.railway.app/api/update/${id}`, {
            name: editName,
            email: editEmail,
          });
          cardhandler();
          getData();
        } catch (err) {
          console.log(err);
        }
      };
      



    useEffect(() => {
        getData();
    }, [])




    return (
        <div>
            <div className="container-fluid bg-danger shadow text-light d-flex justify-content-center p-5">
                <h3 className='fw-bolder font-monospace'>Curd Operation Using Axious, Nodejs and mongoDb</h3>
            </div>
            <div className="container-fluid mt-4">

                {/* form  */}
                <div className="container text-body-emphasis font-monospace fw-bold  p-5 mb-5 shadow bg-light border-5">
                    <form onSubmit={handleSubmit} className="form ">
                        <label htmlFor="name" className='form-label '>Name</label>
                        <input type="text" id="name" className="form-control mb-3 shadow" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required />

                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="email" id="email" className="form-control shadow" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <span className='d-grid mt-5'>
                            <button className="btn btn-danger shadow fw-bold font-monospace">Add</button>

                        </span>
                    </form>
                </div>

                {/* table  */}
                <div className="container ">
                    {edit &&

                        <table className="table table-hover table-striped table-light shadow table-bordered font-monospace ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Operations</th>

                                </tr>
                            </thead>
                            <tbody>
                                {


                                    apiData.map((item) => (

                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td className="d-flex">
                                                <button className="btn btn-success btn-sm me-2" onClick={() => { edithandler(); setEditEmail(item.email);setEditName(item.name);setId(item._id)   }} >Edit</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => { if (window.confirm('Are You Sure Delete Data ? ')) { handleDelete(item._id) } }}>Delete</button>


                                            </td>
                                        </tr>


                                    ))
                                }
                            </tbody>
                        </table>
                    }
                    {card &&
                        <>

                        <span className="fw-bold font-monospace p-2 text-decoration-underline " onClick={cardhandler}> back </span>
                        <div className="container bg-light shadow p-4">
                            <form onSubmit={handleEdit} className="form font-monospace">
                                <label htmlFor="name" className='form-label fw-bold'>Name</label>
                                <input type="text" id="name" className="form-control mb-3 shadow" value={editName}   onChange={(e)=>{setEditName(e.target.value)}} required/>

                                <label htmlFor="email" className='form-label fw-bold'>Email</label>
                                <input type="email" id="email" className="form-control shadow" value={editEmail}  onChange={(e)=>{setEditEmail(e.target.value)}} required/>

                                <span className='d-grid mt-5'>
                                    <button className="btn btn-danger shadow fw-bold font-monospace" >Update</button>

                                </span>
                            </form>
                        </div>
                        </>




                    }
                </div>

                {/* prompt  */}
                <div className="container bg-light shadow mt-5 p-3 rounded-1 mb-5">
                    <h5 className='font-monospace fw-bolder'>prompt</h5>
                    <hr />
                    <span className='font-monospace fw-bold'>Name :</span><br />
                    {name}
                    <br />
                    <br />
                    <span className='font-monospace fw-bold'>email :</span><br />
                    {email}


                </div>
            </div>
        </div>
    )
}
