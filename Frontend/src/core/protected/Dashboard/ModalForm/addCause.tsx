import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addCause } from '../../../../store/modules/partials/addCause'
import { UpdateCauseDetailsByIdAction } from '../../../../store/modules/partials/updateCause';
import { useDispatch } from "react-redux";
import toast from "../../../../components/Notifier/Notifier";
import { getUserDetailssAction } from '../../../../store/modules/categories/getcategory';



interface MyModalProps {
    show: boolean;
    onHide: () => void;
    editData: any
}
interface causeDetails {
    title: string;
    description: string
}

const CauseModal: React.FC<MyModalProps> = ({ show, onHide, editData }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (editData) {
            setTitle(editData.title || '');
            setDescription(editData.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editData]);

    const handleSave = async (userDetails: causeDetails) => {
        if (editData.id) {
            const response: any = await dispatch<any>(UpdateCauseDetailsByIdAction(userDetails, editData.id));
            if (response.status === 200) {
                setTitle('');
                setDescription('')
                onHide()
                dispatch<any>(getUserDetailssAction());
                toast.success("Cause Updated Successfully")
            } else {
                try {
                    if (response.message && response.status === 400) {
                        Object.keys(response.message).forEach((key: string) => {
                            const errorMessage = response.message[key];
                            toast.error(`${key}:${errorMessage[0]}`);
                        });
                    } else if (response.status === 500) {
                        toast.error("Server Error Encountered");
                    } else {
                        toast.error("Something Went Wrong");

                    }
                } catch (error) {
                    toast.error(`${error}`);
                }
            }
        } else {
            const response: any = await dispatch<any>(addCause(userDetails));
            if (response.status === 201) {
                setTitle('');
                setDescription('')
                toast.success("Cause Created Successfully")
            } else {
                try {
                    if (response.message && response.status === 400) {
                        Object.keys(response.message).forEach((key: string) => {
                            const errorMessage = response.message[key];
                            toast.error(`${key}:${errorMessage[0]}`);
                        });
                    } else if (response.status === 500) {
                        toast.error("Server Error Encountered");
                    } else {
                        toast.error("Something Went Wrong");

                    }
                } catch (error) {
                    toast.error(`${error}`);
                }
            }
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
