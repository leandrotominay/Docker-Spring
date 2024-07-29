import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Typography, Button } from '@mui/material';

export default function Student() {
  const [name, setName] = useState('');
  const [students, setStudents] = useState([]);
  const [address, setAddress] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);

    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    }).then(response => {
      if (response.ok) {
        console.log("New student added");
      } else {
        console.error("Failed to add student");
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  };

  useEffect(() => {
    fetch('http://localhost:8080/student/getAll')
      .then(res => res.json())
      .then(result => {
        setStudents(result);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []); // Dependência vazia para garantir que o fetch seja chamado apenas uma vez

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom>
          <u>Add Student</u>
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-name"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-address"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" size="large" onClick={handleClick}>
            Submit
          </Button>
        </Box>

        <Paper elevation={3}>
          {students.map(student=>(
            <Paper elevation ={6} key={student.id}>
                Id: {student.id} |
                Name: {student.name} |
                Address: {student.address}
                </Paper>
          ))}
        </Paper>

      </Paper>
    </Container>
  );
}
