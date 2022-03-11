import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

const SignUp = ({show, toggleShow}) => {
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})


    const handleClose = () => {
    }
    const updateFormData = (key,value) => {
        setForm({
            ...form,
            [key]: value
        })
    }
    const handleSubmit = () => {

        // check form
        const newErrors = checkForm()
        console.log(newErrors)
        console.log(Object.keys(newErrors))
        // if keys exist in form check return value, we have some errors. 
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            // if no errors, close the modal
            toggleShow(false)
            // reset form to allow testing again.
            setForm({})
        }
    }

    const checkForm = () => {
        // destructure form data for checking. 
        const {name, email, pass, pass2 } = form
        const currentErrors = {}
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        const passRegex =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        if(!name || name.replace(/ /g,'') === "") {
            console.log('name is blank.')
            currentErrors.name = 'Name is required.'
        }
        if(!emailRegex.test(email)) {
            currentErrors.email = "Enter a valid email."
        }
        if (pass !== pass2) {
            currentErrors.password = "Passwords must match"
        } else if(!passRegex.test(pass)) {
            currentErrors.password = "Password must have 8 characters min, 1 letter & 1 number."
        }
        return currentErrors
    }

    return  (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton onClick={() => toggleShow(false)}>
                <h4>Sign Up to Shortly!</h4>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    {/* LINK EACH FORM ELEMENT TO A RESPECTIVE ERROR VALUE */}
                    <Form.Group className="mb-2">
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control isInvalid={!!errors.name} onChange={e => updateFormData('name', e.target.value)} type="text" placeholder="Name"/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control isInvalid={!!errors.email} onChange={e => updateFormData('email', e.target.value)} type="email" placeholder="tom@example.com"/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control isInvalid={!!errors.password} onChange={e => updateFormData('pass', e.target.value)} type="password"/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control isInvalid={errors.password} onChange={e => updateFormData('pass2', e.target.value)} type="password" />
                    </Form.Group>
                    <Form.Group>
                        <Button onClick={handleSubmit} variant="info" type="submit">Sign Up</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>

    )
}
export default SignUp