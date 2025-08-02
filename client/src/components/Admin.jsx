import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import React from 'react'

function Admin() {
    const navigate = useNavigate();
  return (
    
    <Row style={{display:"flex",alignItems:"center", justifyContent:"center", margin:20}}>
      <Col>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Agent Management</Card.Title>
                <Card.Text>
                Top agents list
                </Card.Text>
                <Button variant="primary" onClick={()=>{navigate('/admin/recordList')}}>Go to agentList</Button>
            </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Transaction</Card.Title>
                <Card.Text>
                the last 10 transactions
                </Card.Text>
                <Button variant="primary" onClick={()=>{navigate("/transaction")}}>Go Transaction</Button>
            </Card.Body>
        </Card>
      </Col>
    </Row>
    
    
  )
}

export default Admin