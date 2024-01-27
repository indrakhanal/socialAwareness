import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addCause } from '../../../../store/modules/partials/addCause'
import { useDispatch, useSelector } from "react-redux";
import toast from "../../../../components/Notifier/Notifier";


interface MyModalProps {
    show: boolean;
    onHide: () => void;
}
interface causeDetails {
    title: string;
    description: string
}

const CauseModal: React.FC<MyModalProps> = ({ show, onHide }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const handleSave = async (userDetails: causeDetails) => {
        const response: any = await dispatch<any>(addCause(userDetails));
        if(response.status === 201){
            setTitle('');
            setDescription('')
            toast.success("Cause Created Successfully")
        }else{
            toast.error("Something Went Wrong!")
        }
    };

    const handleSubmit = () => {
        const userDetails: causeDetails = {
            title: title,
            description: description,
        };

        handleSave(userDetails);
    };

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header>
                    <Modal.Title>Add Cause Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title here."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};


export default CauseModal;
