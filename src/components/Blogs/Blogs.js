import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import './Blogs.css';

const Blogs = () => {
    return (
        <section>
            <div className='p-5'>
                <Row className='g-5' xs={1} md={4}>
                    <Col>
                        <Card className='h-100 rounded-3 shadow'>
                            <Card.Body className='d-flex flex-column justify-content-between'>
                                <Card.Title className='blogs-title'>Difference between <span>javascript</span> and <span>nodejs</span>:</Card.Title>

                                <Card.Text>JavaScript is a scripting language and NodeJS is a runtime environment of JavaScript. JS can be used to manipulate DOM but NodeJS doesn't have this feature because it is mostly used in server side.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className='h-100 rounded-3 shadow'>
                            <Card.Body className='d-flex flex-column justify-content-between'>
                                <Card.Title className='blogs-title'>When should you use <span>nodejs</span> and <span>mongodb</span>?</Card.Title>

                                <Card.Text>Since I already have the taste of javascript, I can use nodejs for creating servers and APIs of a website with NodeJS. On the other hand, MongoDB is a nosql database which stores data in a BSON-like format, similar to JSON. So if I need flexibility, I can use MongoDB.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className='h-100 rounded-3 shadow'>
                            <Card.Body className='d-flex flex-column justify-content-between'>
                                <Card.Title className='blogs-title'>Differences between <span>sql</span> and <span>nosql</span> databases</Card.Title>

                                <Card.Text>Structured data are stored in SQL database and nosql database are used for storing unstructured data. SQL database are table-based, while NoSQL databases are document, key-value or graph based.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className='h-100 rounded-3 shadow'>
                            <Card.Body className='d-flex flex-column justify-content-between'>
                                <Card.Title className='blogs-title'>What is the purpose of <span>jwt</span> and how does it work?</Card.Title>

                                <Card.Text>JWT are a type of web tokens in a form of JSON object used for establishing secure connection between two parties. For example, every request sent to the server from a user after loggin in, includes a JWT. The server matches the JWT stored in its database with the received JWT to validate the user.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default Blogs;