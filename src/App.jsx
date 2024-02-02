import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Container, Row, Col, FormControl, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Edit from './components/Edit';
import { add, remove } from './redux/cardsSlice';

function App() {
  const cards = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  const [data, setData] = useState({ title: '', body: '' });

  // Function to generate an ID for new Cards
  const generateId = () => {
    const existingId = cards.map((card) => card.id);
    let newId = 1;
    while (existingId.includes(newId)) {
      newId++;
    }
    return newId;
  };

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    // Generate an ID for the new card
    const newCardId = generateId();
    const newCard = { id: newCardId, ...values };
    dispatch(add(newCard));

    // Reset form data
    setData({ title: '', body: '' });
    resetForm({ values: { title: '', body: '' } });
  };

  // Handle card deletion
  const handleDelete = (id) => {
    dispatch(remove(id));
  };

  // Define the validation schema using Yup
  const UserSchema = Yup.object().shape({
    title: Yup.string().required('Title is Required'),
    body: Yup.string().required('Body is Required'),
  });

  return (
    <Router>
      <div className="App" id="wrapper">
        <div className="container-fluid">
          <Row>
            <Col md={3}>
              <Sidebar />
            </Col>

            <Col md={9}>
              <div className="p-4 container-fluid" style={{ backgroundColor: '#E3E8F8' }}>
                <Container>
                  <Row>
                    <Col>
                      <Card className="cards">
                        <Card.Title className="p-3 mt-2" style={{ color: '#203562' }}>
                          Add a Note
                        </Card.Title>

                        {/* Formik handles form state and validation */}
                        <Formik
                          initialValues={{ title: '', body: '' }}
                          validationSchema={UserSchema}
                          onSubmit={handleSubmit}
                        >
                          {({ errors, touched, handleBlur, handleSubmit, handleChange }) => (
                            <Form onSubmit={handleSubmit}>
                              <Form.Group className="mb-3">
                                {/* Title input field */}
                                <Card.Title className="ps-3" style={{ color: '#203562' }}>
                                  <FormControl
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  {errors.title && touched.title && (
                                    <div style={{ color: 'red' }}>{errors.title}</div>
                                  )}
                                </Card.Title>
                              </Form.Group>

                              <Form.Group className="mb-3">
                                {/* Body input field */}
                                <Card.Body className="p-3 mb-5" style={{ color: '#4B649A' }}>
                                  <FormControl
                                    type="text"
                                    placeholder="Take a note"
                                    name="body"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  {errors.body && touched.body && (
                                    <div style={{ color: 'red' }}>{errors.body}</div>
                                  )}
                                  <br />

                                  {/* Submit and Reset buttons */}
                                  <Button variant="primary" type="submit">
                                    Submit
                                  </Button>
                                  &nbsp;&nbsp;
                                  <Button variant="primary" type="reset">
                                    Reset
                                  </Button>
                                </Card.Body>
                              </Form.Group>
                            </Form>
                          )}
                        </Formik>
                      </Card>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <div className="row-cards">
                        <div className="d-flex flex-column gap-2 mt-5">
                          <div>
                            <img src="/Icons/description.svg" alt="Description Icon" /> &nbsp;
                            <span className="notes" style={{ color: '#203562' }}>
                              My Notes
                            </span>
                          </div>
                          <div className="recent ms-1" style={{ color: '#4B649A' }}>
                            <span>Recently viewed</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <div className="d-flex gap-2 p-2 mt-2 cardContainer">
                        {/* Displaying cards */}
                        {cards.map((card) => (
                          <div className="cardsGroup" key={card.id}>
                            <Card className="contentCards">
                              <Card.Title className="ps-3 pt-2 d-flex imgTitle" style={{ color: '#203562' }}>
                                {card.title}
                                <div className="images">
                                  {/* Edit card link */}
                                  <div className="edit-Card">
                                    <Link to={`edit/${card.id}`} state={{ title: card.title, body: card.body }}>
                                      <img src="/Icons/edit.svg" alt="Edit Icon" />
                                    </Link>
                                    &nbsp;
                                  </div>
                                  {/* Delete card button */}
                                  <div className="delete-Card">
                                    <img src="/Icons/delete.svg" alt="Delete Icon" onClick={() => handleDelete(card.id)} />
                                  </div>
                                </div>
                              </Card.Title>
                              <Card.Body>
                                <Card.Text>{card.body}</Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>

          {/* Routing for Edit component */}
          <div className="edit">
            <Routes>
              <Route path={'edit/:id'} element={<Edit />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
