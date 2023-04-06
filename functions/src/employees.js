import { db } from './dbConnect.js';
import { FieldValue } from 'firebase-admin/firestore';

const coll = db.collection('employees');

export async function addEmployee (req, res) {
  const newEmployee = req.body;
  newEmployee.createdAt = FieldValue.serverTimestamp(); //time stamps
  await coll.add(newEmployee);
  res.status(201).send({message: 'Employee successfully added!'});
}

export async function getAllEmployees (req, res) {
  const collection = await coll.get()
    .catch(err => res.status(500).send(err))
  const employeeList = collection.docs.map(employees => employees.data())
  res.send(employeeList)
}

export async function editEmployees (req, res) {
  const { docId } = req.params
  await coll.doc(docId).update(req.body)
    .catch(err => res.status(500).send(err));
  getAllEmployees(req, res);
}

export async function deleteEmployee (req, res) {
  const { docId } = req.params
  await coll.doc(docId).delete()
    .catch(err => res.status(500).send(err))
  res.status(202).send({message: 'Employee Deleted!'})
}

