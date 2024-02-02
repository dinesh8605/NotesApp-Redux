import React, { useState } from 'react';
import { Container, Row, Col, Card, FormControl, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { edit } from '../redux/cardsSlice';

function Edit() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const dispatch = useDispatch();

  // Get the card data from Redux
  const cards = useSelector((state) => state.cards);

  // Find the card based on the Id
  const card = cards.find((c) => c.id === parseInt(id));

  const initialValue = {
    title: card ? card.title : '',
    body: card ? card.body : ''
  };

  const handleSubmit = (values) => {
    dispatch(edit({ id: parseInt(id), updateddata: values }));
    navigate('/app');
  };

  const UserSchema = Yup.object().shape({
    title: Yup.string(),
    body: Yup.string()
  });

  return (
    <div className='row-cards'>
      <Container>
        <Row>
          <Col>
            <div className='d-flex flex-column gap-2 mt-5'>
              <h1> Edit Cards </h1>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className='d-flex gap-2 p-2 mt-2 '>
              <Formik
                initialValues={initialValue}
                validationSchema={UserSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                      <Card.Title className='ps-3' style={{ color: '#203562' }}>
                        <FormControl
                          type='text'
                          placeholder='Title'
                          name='title'
                          value={values.title}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {errors.title && touched.title ? <div style={{ color: 'red' }}>{errors.title}</div> : null}
                      </Card.Title>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Card.Body className='p-3 mb-5' style={{ color: '#4B649A' }}>
                        <FormControl
                          as='textarea'
                          placeholder='Take a note...'
                          name='body'
                          value={values.body}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          style={{ border: 'none' }}
                        />
                        {errors.body && touched.body ? <div style={{ color: 'red' }}>{errors.body}</div> : null}
                        <br />
                        <Button variant='primary' type='submit'>
                          Submit
                        </Button>
                      </Card.Body>
                    </Form.Group>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Edit;
