import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

const Transaction = () => {
  const [amount, setAmount] = useState('');
  const [agentId, setAgentId] = useState('');
  const [agents, setAgents] = useState([]);
  const [transactions, setTransactions]=useState([])
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation]=useState(false)
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [deleteID, setDeleteID]=useState("")

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        
        const response = await fetch("http://localhost:3000/transaction/transaction-data")
        const data = await response.json();
        console.log(data)
        const { transactions, agents } = data.data;
        setTransactions(transactions)
        setAgents(agents);
      } catch (error) {
        console.error('Error retrieving transaction data:', error);
      }
    };

    fetchTransactionData();
  }, [transactions]);


  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAgentIdChange = (e) => {
    setAgentId(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = () => {

    const transaction = {
      amount: parseFloat(amount),
      agent_id: agentId
    };

    fetch('http://localhost:3000/transaction/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        setAmount('');
        setAgentId('');
        setShowAlertSuccess(true)
        setShowConfirmation(false);
        setTimeout(() => {
            setShowAlertSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        setShowAlertError(true)
        setShowConfirmation(false);
        setTimeout(() => {
            setShowAlertError(false);
        }, 5000);
        console.error('Error creating transaction:', error);
      });
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleDelete = async (id) => {
		try {
			await fetch(`http://localhost:3000/transaction/${id}`, {
				method: "DELETE",
			});
			setTransactions(
				transactions.filter((transaction) => transaction._id !== id)
			);
            setShowAlertSuccess(true)
            setTimeout(() => {
                setShowAlertSuccess(false);
            }, 5000);
		} catch (error) {
            setShowAlertError(true)
            setTimeout(() => {
                setShowAlertError(false);
            }, 5000);
			console.error("Error deleting transaction:", error);
		}
	};

    const deleteHandle=(id)=>{
        setDeleteConfirmation(true)
        setDeleteID(id)
    }

  const renderTransactions = () => {
        const sortedTransactions = [...transactions].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
        return sortedTransactions.map((transaction) => (
            <tr key={transaction._id}>
                <td>
                    {transaction.agentId} 
                </td>
                <td>${transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>
                    <button onClick={() => deleteHandle(transaction._id)}>Delete</button>
                </td>
            </tr>
        ));
	};

  return (
    <div>
        {showAlertError && (
              <Alert variant="danger" onClose={() => setShowAlertError(false)} dismissible>
                failed operation
              </Alert>
        )}
        {showAlertSuccess && (
            <Alert variant="success" onClose={() => setShowAlertSuccess(false)} dismissible>
                successfull operation.
            </Alert>
            )}
      <h2>Transaction</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="amount">
          <Form.Label>Amount:</Form.Label>
          <Form.Control type="number" step="0.01" min="0" value={amount} onChange={handleAmountChange} required />
        </Form.Group>

        <Form.Group controlId="agentId">
          <Form.Label>Agent:</Form.Label>
          <Form.Control as="select" value={agentId} onChange={handleAgentIdChange} required>
            <option value="">Select an agent</option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent.name}>
              {/* TODO: met a un console.log(agent) pour vérifier les nom des key:value */}
                {agent.name} | {agent._id}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <h1>Recent Transactions</h1>
        <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>{renderTransactions()}</tbody>
        </table>
      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit the transaction?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteConfirmation} onHide={()=>setDeleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit the transaction?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setDeleteConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{handleDelete(deleteID)
            setDeleteConfirmation(false)}
          }>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Transaction;